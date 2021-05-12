-- ACTUALIZACIONES PARA IMPLEMENTACIÓN DE BITÁCORA
-- ALTER TABLES
ALTER TABLE canciones ADD COLUMN modificador VARCHAR(150);
ALTER TABLE artista ADD COLUMN modificador VARCHAR(150);
ALTER TABLE albumes ADD COLUMN modificador VARCHAR(150);
ALTER TABLE manager ADD COLUMN modificador VARCHAR(150);
ALTER TABLE playlist ADD COLUMN modificador VARCHAR(150);
ALTER TABLE playlist_canciones ADD COLUMN modificador VARCHAR(150);

CREATE TABLE bitacora
(
    fecha TIMESTAMP              NOT NULL,
    username VARCHAR(150)   NOT NULL,
    operacion VARCHAR(100)  NOT NULL,
    tabla VARCHAR(100)      NOT NULL,
    elemento VARCHAR(100)   NOT NULL,

    CONSTRAINT fk_username
        FOREIGN KEY (username)
        REFERENCES usuarios(username)
);
DROP TABLE bitacora;

DROP TRIGGER save_record ON usuarios;

-- TRIGGER PARA ALMACENAR DATOS EN LA BITACORA
CREATE OR REPLACE FUNCTION record()
RETURNS TRIGGER AS
$BODY$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        IF (tg_table_name = 'usuarios') THEN
            INSERT INTO bitacora
            VALUES (now()::timestamp(0), OLD.modificador, TG_OP, TG_TABLE_NAME, OLD.username);
        ELSIF (tg_table_name = 'playlist_canciones') THEN
            INSERT INTO bitacora
            VALUES (now()::timestamp(0), OLD.modificador, TG_OP, TG_TABLE_NAME, OLD.id_playlist);
        ELSE
            INSERT INTO bitacora
            VALUES (now()::timestamp(0), OLD.modificador, TG_OP, TG_TABLE_NAME, OLD.nombre);
        END IF;
    ELSE
        IF (tg_table_name = 'usuarios') THEN
            INSERT INTO bitacora
            VALUES (now()::timestamp(0), NEW.modificador, TG_OP, TG_TABLE_NAME, NEW.username);
        ELSIF (tg_table_name = 'playlist_canciones') THEN
            INSERT INTO bitacora
            VALUES (now()::timestamp(0), NEW.modificador, TG_OP, TG_TABLE_NAME, NEW.id_playlist);
        ELSE
            INSERT INTO bitacora
            VALUES (now()::timestamp(0), NEW.modificador, TG_OP, TG_TABLE_NAME, NEW.nombre);
        END IF;
    END IF;
    RETURN NULL;
END;
$BODY$
LANGUAGE 'plpgsql';

-- NO SÉ SI HABÍA UNA MANERA MÁS EFECTIVA, PERO NO LA ENCONTRÉ
-- USUARIOS
CREATE TRIGGER save_record
AFTER INSERT OR UPDATE OR DELETE
ON usuarios
FOR EACH ROW
EXECUTE PROCEDURE record();
-- CANCIONES
CREATE TRIGGER save_record
AFTER INSERT OR UPDATE OR DELETE
ON canciones
FOR EACH ROW
EXECUTE PROCEDURE record();
-- ARTISTAS
CREATE TRIGGER save_record
AFTER INSERT OR UPDATE OR DELETE
ON artista
FOR EACH ROW
EXECUTE PROCEDURE record();
-- ALBUMES
CREATE TRIGGER save_record
AFTER INSERT OR UPDATE OR DELETE
ON albumes
FOR EACH ROW
EXECUTE PROCEDURE record();
-- MANAGER
CREATE TRIGGER save_record
AFTER INSERT OR UPDATE OR DELETE
ON manager
FOR EACH ROW
EXECUTE PROCEDURE record();
-- PLAYLIST
CREATE TRIGGER save_record
AFTER INSERT
ON playlist
FOR EACH ROW
EXECUTE PROCEDURE record();
-- ACUTALIZACIÓN DE PLAYLIST → SE HACE EN TABLA CANCIÓN_PLAYLIST
CREATE TRIGGER save_record
AFTER INSERT OR UPDATE OR DELETE
ON playlist_canciones
FOR EACH ROW
EXECUTE PROCEDURE record();



-- ACTUALIZACIÓN E INSERCIÓN DE DATOS
-- USUARIOS
-- Desactivar usuario
UPDATE usuarios SET activo = false, modificador = 'Alguien' WHERE username = 'Usuario a modificar';
-- Eliminar suscripción de usuario
UPDATE usuarios SET id_tipousuario = 1, modificador = 'Alguien' WHERE username = 'Usuario a degradar suscripcion';
-- Asociar usuario a un perfil de monitoreo
UPDATE usuarios SET id_monitor = (SELECT id_monitor FROM monitores WHERE nombre = 'nombre monitor') WHERE username = 'Usuario a ser monitor';

-- CANCIONES
-- Modificar nombre
UPDATE canciones SET nombre = 'Nuevo nombre', modificador = 'Alguien' WHERE nombre = 'Nombre anterior';
-- Desactivar una canción
UPDATE canciones SET estado = false, modificador = 'Alguien' WHERE nombre = 'Cancion a desactivar';
-- Activar una canción → No lo piden
-- UPDATE canciones SET estado = true, modificador = 'Alguien' WHERE nombre = 'Cancion a activar';

-- ÁLBUMES
-- Modificar nombre
UPDATE albumes SET nombre = 'Nuevo nombre', modificador = 'alguien' WHERE nombre = 'old name';
-- Desactivar álbum → desactivación de canciones de ese álbum
-- Parametros: 1 → modifier, 2 → album
CREATE OR REPLACE function deactivate_album(varchar, varchar)
RETURNS VOID AS
    $BODY$
    DECLARE
        songs numeric[];
        song numeric;
        album_id numeric;
    BEGIN
        SELECT id_album into album_id
        FROM albumes
        WHERE nombre = $2;
        SELECT ARRAY(SELECT *
                    FROM cancion_album
                    WHERE id_album = album_id) INTO songs;
        FOREACH song in array songs LOOP
           UPDATE canciones SET estado = FALSE, modificador = $1 WHERE id_cancion = song;
        END LOOP;
       UPDATE albumes SET activado = false, modificador = $1 WHERE id_album = album_id;
    END;
    $BODY$
LANGUAGE 'plpgsql';

-- ARTISTA
-- ARTISTAS
-- Desactivar artista → desactiva álbumes y canciones
-- Parámetros 1 → modificador, 2 → artista

CREATE OR REPLACE function deactivate_artist(varchar, varchar)
RETURNS VOID AS
    $BODY$
    DECLARE
        albums numeric[];
        album numeric;
    BEGIN
        -- Desactiva álbumes
        SELECT ARRAY ( SELECT id_album
        FROM cancion_album
            INNER JOIN canciones c on c.id_cancion = cancion_album.id_canciones
            INNER JOIN artista a on a.id_artista = c.id_artista
        WHERE a.nombre = $2
        GROUP BY id_album) INTO albums;
        FOREACH album in array albums LOOP
           UPDATE albumes SET activado = FALSE, modificador = $1 WHERE id_album = album;
        END LOOP;
        -- Desactiva canciones
        UPDATE canciones SET estado = FALSE, modificador = $1
        WHERE id_artista = (SELECT id_artista FROM artista WHERE artista.nombre = $2);
        -- Desactiva al artista
        UPDATE artista SET activado = FALSE, modificador = $1
        WHERE nombre = $2;
        -- Modifica tipo de usuario
        UPDATE usuarios SET id_tipousuario = 2, modificador = $1, id_artista = NULL
        WHERE username = (SELECT id_artista FROM usuarios INNER JOIN artista a2 on a2.id_artista = usuarios.id_artista WHERE a2.nombre = $2);
    END;
    $BODY$
LANGUAGE 'plpgsql';
SELECT deactivate_artist();
-- Upgrade a artista
-- Parametros 1 → nombre de artista, 2 → modificador
CREATE OR REPLACE function updgrade_artist(varchar, varchar)
RETURNS VOID AS
    $BODY$
    BEGIN
       INSERT INTO artista (nombre, modificador) VALUES ($1, $2);
       UPDATE usuarios SET id_tipousuario = 4, id_artista = (SELECT id_artista FROM artista WHERE nombre = $1),
       modificador = $2 WHERE username = $2;
    END
    $BODY$
LANGUAGE 'plpgsql';
SELECT updgrade_artist('hell', 'Zara12');

-- MANAGER
INSERT INTO manager VALUES ('Nombre de manager - sames as username', 'Modificador - same, porque se hace un upgrade');

-- ELIMINACIONES
-- ANTES DE ELIMINAR, PARA EFECTOS DE QUE QUEDE GUARDADO EN LA BITÁCORA, DEBE DE HACER UN UPDATE
-- ARTISTA
-- Parámetros 1 → modificador, 2 → artista

CREATE OR REPLACE function delete_artist(varchar, varchar)
RETURNS VOID AS
    $BODY$
    DECLARE
        albums numeric[];
        album numeric;
    BEGIN
        -- Actualiza modificador en álbumes
        SELECT ARRAY ( SELECT id_album
        FROM cancion_album
            INNER JOIN canciones c on c.id_cancion = cancion_album.id_canciones
            INNER JOIN artista a on a.id_artista = c.id_artista
        WHERE a.nombre = $2
        GROUP BY id_album) INTO albums;
        FOREACH album in array albums LOOP
           UPDATE albumes SET modificador = $1 WHERE id_album = album;
        END LOOP;
        -- Actualiza modificador en canciones
        UPDATE canciones SET estado = FALSE, modificador = $1
        WHERE id_artista = (SELECT id_artista FROM artista WHERE artista.nombre = $2);
        -- Desactiva al artista
        UPDATE artista SET modificador = $1 WHERE nombre = $2;
        -- Modifica tipo de usuario
        UPDATE usuarios SET id_tipousuario = 2, modificador = $1, id_artista = NULL
        WHERE username = (SELECT id_artista FROM usuarios INNER JOIN artista a2 on a2.id_artista = usuarios.id_artista
        WHERE a2.nombre = $2);
        DELETE from artista where nombre = $2;
    END;
    $BODY$
LANGUAGE 'plpgsql';

-- ÁLBUM
-- Parámetros: 1 → modificador, 2 → álbum
CREATE OR REPLACE function delete_album(varchar, varchar)
RETURNS VOID AS
    $BODY$
    DECLARE
        songs numeric[];
        song numeric;
        album_id numeric;
    BEGIN
        SELECT id_album into album_id
        FROM albumes
        WHERE nombre = $2;
        SELECT ARRAY(SELECT id_canciones
                    FROM cancion_album
                    WHERE id_album = album_id) INTO songs;
        FOREACH song in array songs LOOP
           UPDATE canciones SET modificador = $1 WHERE id_cancion = song;
        END LOOP;
        UPDATE albumes SET modificador = $1 WHERE id_album = album_id;
        DELETE from albumes WHERE id_album = album_id;
    END;
    $BODY$
LANGUAGE 'plpgsql';

DROP FUNCTION delete_album(varchar, varchar);

-- CANCIÓN
-- Parámetros 1 → modificador, 2 → canción
CREATE OR REPLACE function delete_song(varchar, varchar)
RETURNS VOID AS
    $BODY$
    DECLARE
        song_id numeric;
    BEGIN
        SELECT id_cancion into song_id
        FROM canciones
        WHERE nombre = $2;
        UPDATE canciones SET modificador = $1 WHERE id_cancion = song_id;
        DELETE from canciones WHERE id_cancion = song_id;
    END;
    $BODY$
LANGUAGE 'plpgsql';

SELECT delete_song('Zara12','Savoiur');
