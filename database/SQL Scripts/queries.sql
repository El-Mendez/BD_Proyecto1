-- Crear nuevo usuario (Sing in)
INSERT INTO usuarios (username, contraseña, nombres, apellidos, correo)
VALUES ('El_Pepe', crypt('$2', gen_salt('bf')), 'Orlando', 'Orlanda', 'orlando.osberto@gmail.com');

-- LogIn
SELECT * FROM usuarios u WHERE
        u.username like 'Zara12' AND
        contraseña = crypt('noSequePoner', contraseña);
-- Busqueda por artista
SELECT a.nombre
FROM artista a
WHERE a.nombre ILIKE 'Sam Smith%';

-- Busqueda de canciones y albums por artista
--Busqueda de cancion por artista
SELECT c.nombre
FROM artista a
         INNER JOIN canciones c on a.Id_artista = c.id_artista
WHERE a.nombre = 'Sam Smith';
-- Busqueda de album por artista
SELECT a2.nombre AS album, c.nombre AS cancion
FROM artista a
         INNER JOIN canciones c on a.Id_artista = c.id_artista
         INNER JOIN cancion_album ca on c.id_cancion = ca.id_canciones
         INNER JOIN albumes a2 on a2.id_album = ca.id_album
WHERE a.nombre ILIKE 'Sam Smith';

-- Busqueda de canciones por genero
SELECT c.nombre AS cancion, a.nombre AS artista, g.nombre AS genero
FROM genero g
         INNER JOIN genero_canciones gc on g.id_genero = gc.id_genero
         INNER JOIN canciones c on c.id_cancion = gc.id_canciones
         INNER JOIN artista a on c.id_artista = a.Id_artista
WHERE g.nombre ILIKE 'Pop%';

-- Busqueda de album
SELECT DISTINCT a2.nombre AS artista, a.nombre AS albumes
FROM albumes a
         INNER JOIN cancion_album ca on a.id_album = ca.id_album
         INNER JOIN canciones c ON c.id_cancion = ca.id_canciones
         INNER JOIN artista a2 ON c.id_artista = a2.id_artista
WHERE a.nombre ILIKE 'Love Goes%';

--Busqueda por cancion
SELECT c.nombre AS cancion, a.nombre AS artista, g.nombre AS genero
FROM canciones c
         INNER JOIN artista a ON c.id_artista = a.Id_artista
         INNER JOIN genero_canciones gc ON c.id_cancion = gc.id_canciones
         INNER JOIN genero g ON g.id_genero = gc.id_genero
         INNER JOIN cancion_album ca on c.id_cancion = ca.id_canciones
WHERE c.nombre ILIKE 'sauce%';

-- Usuario sin suscripcion solo reproduce 3 tracks diarios /AGREGAR FECHA
SELECT id_tipoUsuario FROM usuarios; -- Verifico el tipo de usuario
-- Si el usuario no es premium entonces busca la cantidad de canciones escuchadas en el dia
SELECT SUM(ec.cantidad)
FROM escucha_cancion ec
WHERE id_usuario = 'Zara12' AND fecha = now();

SELECT * FROM escucha_cancion WHERE id_usuario = 'Zara12';

-- Update tipo de usuario (cuando el usuario se suscribe y cuenta con suscripcion activa)
UPDATE usuarios SET id_tipoUsuario = 2 WHERE username = 'Zara12';

-- Crear playlist
INSERT INTO playlist (nombre)
VALUES
('Nose');

-- Agg cancion a una playlist
SELECT p.id_playlist
FROM playlist p
WHERE p.nombre ILIKE 'Nose';

SELECT c.id_cancion
FROM canciones c
WHERE c.nombre ILIKE 'Higher Higher';

INSERT INTO playlist_canciones
VALUES
(1,1); -- Aqui pasa el resultado de las queries anteriores

-- Update de tipo de usuario (artista/manager)
UPDATE usuarios SET id_tipoUsuario = 4 WHERE username = 'Zara12'; -- Para modificar un usuario a artista
UPDATE usuarios SET id_tipoUsuario = 5 WHERE username = 'Zara12'; -- Para modificar un usuario a manager

-- ADMINISTRADORES
-- Inactivar canciones del catálogo Update a canciones
UPDATE canciones SET estado = false WHERE nombre = 'Higher Higher'; -- Pasa el nombre de la cancion que se quiere desactivar

-- Update cancion
UPDATE canciones SET nombre = 'Algo' WHERE nombre = 'Algo2'; -- Para modificar el nombre de la cancion
UPDATE canciones SET link = 'algunLink' WHERE nombre = 'Algo2'; -- Para modificar un usuario a manager
UPDATE canciones SET id_artista = 2 WHERE nombre = 'Algo2'; -- Para modificar el artista a una cancion

-- Update album
UPDATE albumes SET nombre = 'AlgoN' WHERE nombre = 'Algo1'; -- Algo y Algo2
UPDATE albumes SET fecha_publicacion = 'st' WHERE nombre = 'Algo1';

-- Update artista
UPDATE artista SET nombre = 'Algo' WHERE nombre = 'Algo2'; -- Para modificar el nombre del artista

-- Delete cancion
DELETE FROM canciones WHERE nombre = 'Algo'; -- Entra el nombre de la cancion a eliminar

-- Delete album
DELETE FROM albumes WHERE nombre ='Algo'; -- Entra el nombre del album a eliminar y con ello a su vez elimina las canciones de ese album

-- Delete artista
DELETE FROM artista WHERE nombre = 'Algo'; -- Entra el nombre del artista a eliminar y con ello a su vez elimina el album y sus caciones

-- REPORTES PARA EL ADMINISTRADOR

--1 Albums mas recientes de la semana
SELECT a.nombre
FROM albumes a
WHERE a.fecha_publicacion >= date_trunc('MONTH',now())::DATE;


--2 Artistas con popularidad creciente en los ultimos 3 meses
-- Canciones escuchadas hace 3 meses
SELECT SUM(ec.cantidad) AS cantidad, a.nombre
FROM escucha_cancion ec
         INNER JOIN canciones c ON ec.id_cancion = c.id_cancion
         INNER JOIN artista a ON a.id_artista = c.id_artista
WHERE fecha >= (current_date - interval '3 month')::date AND fecha < current_date - interval '2 month'
GROUP BY a.nombre;
-- Canciones escuchadas hace 2 meses
SELECT SUM(ec.cantidad) AS cantidad, a.nombre
FROM escucha_cancion ec
         INNER JOIN canciones c ON ec.id_cancion = c.id_cancion
         INNER JOIN artista a ON a.id_artista = c.id_artista
WHERE fecha >= (current_date - interval '2 month')::date AND fecha < current_date - interval '1 month'
GROUP BY a.nombre;
-- Canciones escuchadas hace un mes
SELECT SUM(ec.cantidad) AS cantidad, a.nombre
FROM escucha_cancion ec
         INNER JOIN canciones c ON ec.id_cancion = c.id_cancion
         INNER JOIN artista a ON a.id_artista = c.id_artista
WHERE fecha >= (current_date - interval '1 month')::date AND fecha < current_date
GROUP BY a.nombre;

-- Combinacion de los queries
SELECT mes1.artista, mes1.cantidad AS mes_pasado, mes2.cantidad AS hace_2_meses, mes3.cantidad AS hace_3_meses
FROM (SELECT SUM(ec.cantidad) AS cantidad, a.nombre AS artista
      FROM escucha_cancion ec
               INNER JOIN canciones c ON ec.id_cancion = c.id_cancion
               INNER JOIN artista a ON a.id_artista = c.id_artista
      WHERE fecha >= (current_date - interval '3 month')::date AND fecha < current_date - interval '2 month'
      GROUP BY a.nombre) mes3
         INNER JOIN (
    SELECT SUM(ec.cantidad) AS cantidad, a.nombre AS artista
    FROM escucha_cancion ec
             INNER JOIN canciones c ON ec.id_cancion = c.id_cancion
             INNER JOIN artista a ON a.id_artista = c.id_artista
    WHERE fecha >= (current_date - interval '2 month')::date AND fecha < current_date - interval '1 month'
    GROUP BY a.nombre) mes2 ON mes3.artista = mes2.artista
         INNER JOIN (
    SELECT SUM(ec.cantidad) AS cantidad, a.nombre AS artista
    FROM escucha_cancion ec
             INNER JOIN canciones c ON ec.id_cancion = c.id_cancion
             INNER JOIN artista a ON a.id_artista = c.id_artista
    WHERE fecha >= (current_date - interval '1 month')::date AND fecha < current_date
    GROUP BY a.nombre) mes1 ON mes1.artista = mes2.artista AND mes1.artista = mes3.artista
WHERE mes1 > mes2 AND mes2 > mes3;

-- Se comparan la cantidad de canciones escuchadas por mes
--3. Cantidad de nuevas suscripciones mensuales durante los últimos seis meses
SELECT count(*) FROM suscripcion s
WHERE s.fecha_inicio > (current_date - 183) AND s.fecha_inicio < current_date
GROUP BY fecha_inicio
ORDER BY fecha_inicio ASC;


--4. Artistas con mayor producción musical
SELECT a.nombre , count(*) AS cantidad FROM canciones c
                                                INNER JOIN artista a ON c.id_artista = a.id_artista
GROUP BY a.nombre
ORDER BY cantidad DESC LIMIT 1;
--5. 5 Géneros más populares
SELECT g.nombre, count(*) AS cantidad FROM genero_canciones gc
                                               INNER JOIN genero g ON g.id_genero = gc.id_genero
GROUP BY g.nombre
ORDER BY cantidad DESC LIMIT 5;
--6 Usuarios mas activos en la plataforma en el ultimo mes
SELECT u.username, count (*) as cantidad
FROM escucha_cancion ec
         INNER JOIN usuarios u ON ec.id_usuario = u.username
WHERE ec.fecha > ((current_date - interval '1 month')::date -  EXTRACT(DAY FROM current_date - 1)::int)
  AND ec.fecha < ((date_trunc('month', now()) + interval '1 month') - interval '1 day')::date
GROUP BY u.username
ORDER BY cantidad DESC limit 5;

-- DATA PARA EL FRONTEND

-- Info de usuario (Pantalla de configuracion)
SELECT u.username, u.nombres, u.apellidos, u.correo, tu.descripcion, u.id_tipousuario
FROM usuarios u
         INNER JOIN tipo_usuario tu ON u.id_tipoUsuario = tu.id_tipoUsuario
WHERE u.username ILIKE 'Zara12';

-- Canciones agrupadas por generos
SELECT nombre
FROM genero; -- Se guardan todos los generos en un array
SELECT c.nombre, a.nombre AS artista , g.nombre AS genero
FROM genero g
         INNER JOIN genero_canciones gc on g.id_genero = gc.id_genero
         INNER JOIN canciones c on c.id_cancion = gc.id_canciones
         INNER JOIN artista a on c.id_artista = a.Id_artista
WHERE g.nombre ILIKE 'Pop%'; -- Se pasan los generos del array

-- Playlist creadas por un usario especifico
SELECT p.nombre
FROM usuario_playlist up
         INNER JOIN playlist p on p.id_playlist = up.id_playlist
         INNER JOIN usuarios u on u.username = up.id_usuario
WHERE u.username ILIKE 'Zara12';

SELECT * FROM usuario_playlist up ;

-- Desglozar canciones de una playlist
SELECT c.nombre
FROM usuario_playlist up
         INNER JOIN playlist p ON up.id_usuario = p.id_playlist
         INNER JOIN playlist_canciones pc ON pc.id_playlist = p.id_playlist
         INNER JOIN canciones c  ON c.id_cancion = pc.id_canciones
WHERE  up.id_usuario like 'Zara12';

-- Desglozar canciones de un album
SELECT c.nombre
FROM cancion_album
         INNER JOIN canciones c on c.id_cancion = cancion_album.id_canciones
         INNER JOIN albumes a on a.id_album = cancion_album.id_album
WHERE a.nombre ILIKE 'In The Lonely Hour';

-- Albums por artista
SELECT DISTINCT a.nombre
FROM albumes a
         INNER JOIN cancion_album c ON c.id_album = a.id_album
         INNER JOIN canciones c2 ON c2.id_cancion = c.id_canciones
         INNER JOIN artista a2  ON a2.id_artista = c2.id_artista
WHERE a2.nombre ilike 'Sam%';

-- Update escucha cancion
-- Obtiene id de cancion
SELECT id_cancion
FROM canciones
WHERE nombre ILIKE 'Algo';
-- Verifica si el usuario ya ha escuchado esa cancion en ese dia
SELECT id_cancion, id_usuario, fecha
FROM escucha_cancion
WHERE id_cancion = 2 AND id_usuario ILIKE 'Zara12' AND fecha = now(); --Comprobar el formato de salida de now
-- Si el usuario ya ha escuchado la cancion en ese dia entonces hace un UPDATE
UPDATE escucha_cancion SET cantidad = cantidad + 1 WHERE id_cancion = 'Algo' AND id_usuario = 'Algo' AND fecha = now();
-- Si el usuario no ha escuchado la cancion, entonces inserta una nueva tuppla
INSERT INTO escucha_cancion (id_cancion, id_usuario, fecha)
VALUES
(1,1,now());

-- link/id de las canciones para reproduccion
SELECT link
FROM canciones
WHERE nombre ILIKE 'Algo';

-- NUEVOS REPORTES
-- TOTAL DE REPRODUCCIONES POR SEMANA
-- QUERY
-- AJUSTAR PARA QUE EL USUARIO PUEDA INGRESAR LA FECHA EN ESPAÑOL
SELECT COUNT(*)
FROM stream
WHERE fecha BETWEEN ('4-01-2021') AND (CAST('4-01-2021' AS DATE) + CAST('7 days' AS INTERVAL));
-- Stored procedure
CREATE OR REPLACE function weekly_streams(date)
RETURNS NUMERIC AS
    $BODY$
    BEGIN
       RETURN
        (SELECT COUNT(*)
        FROM stream
        WHERE fecha BETWEEN $1 AND (CAST($1 AS DATE) + CAST('7 days' AS INTERVAL)));

        EXCEPTION
            WHEN sqlstate '22007' THEN
                RAISE EXCEPTION 'El mes %, es incorrecto',$1;
    END;
    $BODY$
LANGUAGE 'plpgsql';

SELECT *
FROM weekly_streams('04-01-2021');

-- N ARTISTAS CON LAS MAYORES REPRODUCCIONES
-- QUERY
SELECT a.nombre, count(*) AS reproducciones FROM stream s
	INNER JOIN canciones c ON c.id_cancion = s.id_cancion
	INNER JOIN artista a ON a.id_artista = c.id_artista
	WHERE s.fecha BETWEEN ('3-05-2021') AND ('11-05-2021')
	GROUP BY a.nombre
	ORDER BY reproducciones DESC LIMIT 2;
-- Stored Procedure
CREATE OR REPLACE function best_artists(date, date, integer)
RETURNS TABLE (artista varchar, reproducciones bigint) AS
    $BODY$
    BEGIN
       RETURN QUERY
        SELECT a.nombre, count(*) AS reproducciones FROM stream s
		      INNER JOIN canciones c ON c.id_cancion = s.id_cancion
				INNER JOIN artista a ON a.id_artista = c.id_artista
				WHERE s.fecha BETWEEN ($1) AND ($2)
				GROUP BY a.nombre
				ORDER BY reproducciones DESC
            LIMIT $3;
        EXCEPTION
            WHEN sqlstate '22007' THEN
                RAISE EXCEPTION 'El mes %, es incorrecto',$1;
                 END;
    $BODY$
LANGUAGE 'plpgsql';

SELECT *
FROM best_artists('04-01-2021', 1);

-- TOTAL DE REPRODUCCIONES POR GENERO DADO UN RANGO DE FECHA
CREATE OR REPLACE FUNCTION genre_stream(desde DATE, hasta DATE)
RETURNS table(genero varchar(50), id_genero int, quantity bigint) AS
$$
    SELECT g.nombre, r.id_genero, r.quantity
    FROM genero g
        INNER JOIN (
            select gc.id_genero, count(*) as quantity
            FROM stream s
                INNER JOIN genero_canciones gc on gc.id_canciones = s.id_cancion       --INNER JOIN genero_canciones
            WHERE fecha BETWEEN (desde) AND (hasta)
            GROUP BY gc.id_genero
        ) r on g.id_genero = r.id_genero;
$$ LANGUAGE 'sql';

SELECT *
FROM genre_stream('05-03-2021', '05-05-2021');

-- N CANCIONES CON MAS REPRODUCCIONES PARA UN ARTISTA M
CREATE OR REPLACE function artist_songs(varchar, integer)
RETURNS TABLE (cancion varchar, reproducciones bigint) AS
    $BODY$
    BEGIN
       RETURN QUERY
        SELECT c.nombre as cancion, COUNT(*) as reproducciones
        FROM stream
            INNER JOIN canciones c on c.id_cancion = stream.id_cancion
            INNER JOIN artista a on a.id_artista = c.id_artista
        WHERE a.nombre = $1
        GROUP BY cancion
        ORDER BY reproducciones DESC
        LIMIT $2;

    END;
    $BODY$
LANGUAGE 'plpgsql';

SELECT *
FROM artist_songs('Sam Smith', 2);

-- COMISIONES PARA ARTISTAS
CREATE OR REPLACE FUNCTION calculate_revenue(artista varchar(50))
RETURNS table(id_artista int, nombre varchar(50), revenue float) AS
$$
    SELECT c.id_artista, a.nombre, count(*) * 0.15
    FROM stream s
        INNER JOIN canciones c on c.id_cancion = s.id_cancion
        INNER JOIN artista a on a.id_artista = c.id_artista
        WHERE date_part('month', current_date) = date_part('month', s.fecha)
           AND date_part('year', current_date) = date_part('year', s.fecha)
           AND a.nombre = artista
        GROUP BY c.id_artista, a.nombre
$$ LANGUAGE 'sql';

-- BITACORA
CREATE OR REPLACE FUNCTION record(varchar)
RETURNS TRIGGER AS
$BODY$
BEGIN
        IF INSERTING THEN
            INSERT INTO bitacora
            VALUES (current_date, $1, 'INSERTÓ',  )
        ELSEIF UPDATING THEN
            INSERT INTO bitacora
            VALUES (current_date, 'PEPITO', 'ACTUALIZÓ' )
        ELSE
            INSERT INTO bitacora
            VALUES (current_date, 'PEPITO', 'ELIMINÓ' )
        END IF;
END;
$BODY$
LANGUAGE 'plpgsql'
;

CREATE TRIGGER save_record

AFTER INSERT OR UPDATE OR DELETE
ON usuarios, artistas, canciones
FOR EACH ROW
EXECUTE PROCEDURE record('Pepito');



-- TAREAS DE MONITORES
-- MODIFICANDO INFORMACION DE UN TRACK O ALBUM
CREATE OR REPLACE FUNCTION modificarCancionArtista(artista integer, id integer)  RETURNS void AS $$
    BEGIN
		UPDATE canciones SET id_artista = artista WHERE id_cancion = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION modificarCancionLink(link TEXT, id integer)  RETURNS void AS $$
    BEGIN
		UPDATE canciones SET link = link WHERE id_cancion = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION modificarCancionName(nombre TEXT, id integer)  RETURNS void AS $$
    BEGIN
		UPDATE canciones SET nombre = nombre WHERE id_cancion = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION modificarAlbumName(nombre TEXT, id integer)  RETURNS void AS $$
    BEGIN
		UPDATE albumes SET nombre = nombre WHERE id_album = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION modificarAlbumDate(fecha date, id integer)  RETURNS void AS $$
    BEGIN
		UPDATE albumes SET fecha_publicacion = fecha WHERE id_album = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
--DESACTIVANDO TRACKS O ALBUMES
CREATE OR REPLACE FUNCTION desactivateSong(id integer)  RETURNS void AS $$
    BEGIN
		UPDATE canciones SET estado = FALSE WHERE id_cancion = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION desactivateAlbum(id integer)  RETURNS void AS $$
    BEGIN
		UPDATE albumes SET activado = FALSE WHERE id_album = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;


--DESACTIVANDO USUARIOS SIN SUSCRIPCION
-- Query de búsqueda de usuarios sin suscripción
SELECT username from usuario where tipo¡
CREATE OR REPLACE FUNCTION desactivateUser(id integer)  RETURNS void AS $$
    BEGIN
		UPDATE usuarios SET activo = FALSE WHERE username = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;

-- ELIMINANDO SUSCRIPCION DE UN USUARIO
-- Query de búsqueda de usuarios con suscipción
CREATE OR REPLACE FUNCTION desactivateSuscriptionUser(id integer)  RETURNS void AS $$
    BEGIN
		UPDATE usuarios SET id_tipoUsuario = 1 WHERE username = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
-- DESACTIVANDO USUARIOS COMO ARTISTAS (CONSULTA A DIANA)
CREATE OR REPLACE FUNCTION desactivateArtistUser(artist TEXT)  RETURNS void AS $$
    BEGIN
		UPDATE artista SET activado = FALSE WHERE nombre = artist;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
-- Asociar un usuario existente a un perfiles de monitoreo
CREATE OR REPLACE FUNCTION userMonitor(id TEXT, tipo INT)  RETURNS void AS $$
    BEGIN
		UPDATE usuarios SET id_monitor = tipo WHERE username = id;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_revenue(artista varchar(50))
RETURNS table(id_artista int, nombre varchar(50), revenue float) AS
$$
    SELECT c.id_artista, a.nombre, count(*) * 0.15
    FROM stream s
        INNER JOIN canciones c on c.id_cancion = s.id_cancion
        INNER JOIN artista a on a.id_artista = c.id_artista
        WHERE date_part('month', current_date) = date_part('month', s.fecha)
           AND date_part('year', current_date) = date_part('year', s.fecha)
           AND a.nombre = artista
        GROUP BY c.id_artista, a.nombre
$$ LANGUAGE 'sql';


CREATE OR REPLACE FUNCTION tareas_monitor(monitor varchar(50), tarea int)  RETURNS void AS $$
    BEGIN
		INSERT INTO monitor_tarea VALUES ((SELECT id_monitor FROM monitores m2 WHERE nombre = monitor), tarea);
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;

SELECT m.nombre, mt.id_tarea FROM monitor_tarea mt 
	INNER JOIN monitores m ON mt.id_monitor = m.id_monitor ;


CREATE INDEX genre ON genero(id_genero);
CREATE INDEX artis ON artista(id_artista);
CREATE INDEX stream_date ON stream(fecha);
CREATE INDEX song ON canciones(id_cancion);