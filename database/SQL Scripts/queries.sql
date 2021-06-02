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

-- SIMULACIÓN
-- OPTION 1
SELECT random()*3
FROM canciones
WHERE id_cancion = floor(random()*3)
LIMIT 1;

-- OPTION 2
-- BEST OPTION
-- RANDOM SONGS
SELECT *
FROM canciones
WHERE estado=TRUE
OFFSET floor(random()*(SELECT count(*) FROM canciones WHERE estado = TRUE))
LIMIT 1;

-- RANDOM USERS
SELECT *
FROM usuarios
WHERE id_tipoUsuario != 1 AND activo = TRUE
OFFSET floor(random()*(SELECT count(*) FROM usuarios WHERE id_tipoUsuario != 1 AND activo = TRUE))
LIMIT 1;


-- TRYING THE EXTENSION
-- THIS DOESNT WORK ON SMALL TABLES
SELECT *  FROM canciones TABLESAMPLE SYSTEM_ROWS(1);

CREATE OR REPLACE function streams_simulation(date, integer)
RETURNS VOID AS
    $BODY$
    DECLARE
        user_name varchar;
        id_song numeric;
    BEGIN
        FOR i IN 1..$2 LOOP
            -- RANDOM SONG
            SELECT id_cancion INTO id_song
            FROM canciones
            WHERE estado=TRUE
            OFFSET floor(random()*(SELECT count(*) FROM canciones WHERE estado = TRUE))
            LIMIT 1;
            -- RANDOM USER
            SELECT username INTO user_name
            FROM usuarios
            WHERE id_tipoUsuario != 1 AND activo = TRUE
            OFFSET floor(random()*(SELECT count(*) FROM usuarios WHERE id_tipoUsuario != 1 AND activo = TRUE))
            LIMIT 1;
            INSERT INTO stream VALUES (id_song,user_name, $1);
            END LOOP;
    END;
    $BODY$
LANGUAGE 'plpgsql';

SELECT streams_simulation('05-19-2021',2);

------- SIMULACIONES

-- OPTION 1
SELECT random()*3
FROM canciones
WHERE id_cancion = floor(random()*3)
LIMIT 1;

-- OPTION 2
-- BEST OPTION
-- RANDOM SONGS
SELECT *
FROM canciones
WHERE estado=TRUE
OFFSET floor(random()*(SELECT count(*) FROM canciones WHERE estado = TRUE))
LIMIT 1;

-- RANDOM USERS
SELECT *
FROM usuarios
WHERE id_tipoUsuario != 1 AND activo = TRUE
OFFSET floor(random()*(SELECT count(*) FROM usuarios WHERE id_tipoUsuario != 1 AND activo = TRUE))
LIMIT 1;


-- TRYING THE EXTENSION
-- THIS DOESNT WORK ON SMALL TABLES
SELECT *  FROM canciones TABLESAMPLE SYSTEM_ROWS(1);

-- SIMULACIÓN PARA ESCUCHAR CANCIONES
CREATE OR REPLACE function streams_simulation(date, integer)
RETURNS VOID AS
    $BODY$
    DECLARE
        user_name varchar;
        id_song numeric;
    BEGIN
        FOR i IN 1..$2 LOOP
            -- RANDOM SONG
            SELECT id_cancion INTO id_song
            FROM canciones
            WHERE estado=TRUE
            OFFSET floor(random()*(SELECT count(*) FROM canciones WHERE estado = TRUE))
            LIMIT 1;
            -- RANDOM USER
            SELECT username INTO user_name
            FROM usuarios
            WHERE id_tipoUsuario != 1 AND activo = TRUE
            OFFSET floor(random()*(SELECT count(*) FROM usuarios WHERE id_tipoUsuario != 1 AND activo = TRUE))
            LIMIT 1;
            INSERT INTO stream VALUES (id_song,user_name, $1);
            END LOOP;
    END;
    $BODY$
LANGUAGE 'plpgsql';

SELECT streams_simulation('03-13-2019',30);

-- nombre, artista, género musical,fecha de reproducción

SELECT c.nombre as nombre, a.nombre as artista, g.nombre as genero, CAST(fecha AS VARCHAR) as reproduccion
FROM stream
    INNER JOIN canciones c on c.id_cancion = stream.id_cancion
    INNER JOIN artista a on a.id_artista = c.id_artista
    INNER JOIN genero_canciones gc on c.id_cancion = gc.id_canciones
    INNER JOIN genero g on g.id_genero = gc.id_genero;

DROP TABLE songs;

-- #2
CREATE TABLE songs(
    nombre VARCHAR(250),
    link VARCHAR(100)
);

INSERT INTO songs
VALUES
       ('All I Want','mtf7hC17IBM'),
       ('Say You Wont Let Go','0yW7w8F2TVA'),
       ('Secret Love', 'qgy7vEje5-w'),
       ('Scars To Your Beautiful','d7s1dMSrZ_E'),
       ('Where Have You Been','HBxt_v0WF6Y'),
       ('Photograph','p1JmzB6E-C8'),
       ('Back To You','-HjpL-Ns6_A'),
       ('Like Im Gonna Lose You','2-MBfn8XjIU'),
       ('Perfect','2Vv-BfVoq4g'),
       ('The Hills','yzTuBuRdAyA'),
       ('Sign Of The Times','qN4ooNx77u0'),
       ('When I Was Your Man','ekzHIouo8Q4'),
       ('Blank Space','e-ORhEE9VVg'),
       ('Lovely','V1Pl8CzNzCw'),
       ('Somebody','8UVNT4wvIGY'),
       ('Million Reasons','en2D_5TzXCA'),
       ('Mercy','KkGVmN68ByU'),
       ('I Like Me Better','a7fzkqLozwA'),
       ('Someone Like You','hLQl3WQQoQ0'),
       ('What A Time','4OxZIyNC6qc'),
       ('You & I','_kqQDCxRCzM'),
       ('Ocean Eyes','viimfQi_pUw'),
       ('The Heart Wants What Wants','ij_0p_6qTss'),
       ('We Dont Talk Anymore','3AtDnEC4zak'),
       ('Steal My Girl','UpsKGvPjAgw'),
       ('All Of Me','450p7goxZqg'),
       ('Just The Way Your Are', 'LjhCEhWiKXk'),
       ('Please Dont Go','KTjHqOIwkow'),
       ('Im Not The Only One','nCkpzqqog4k'),
       ('Treat You Better','lY2yjAdbvdQ'),
       ('Need You now','eM213aMKTHg'),
       ('One Last Time', 'Wg92RrNhB8s'),
       ('History','yjmp8CoZBIo'),
       ('Somebody Else', 'U9NEoHrkldM'),
       ('Love Like You Do', 'AJtDXIazrMo'),
       ('Just Give Me a Reason', 'OpQFFLBMEPI'),
       ('Dancing On My Own', 'q31tGyBJhRY'),
       ('Pillowtalk', 'C_3d6GntKbk'),
       ('Mirros', 'uuZE_IRwLNI'),
       ('Stitches', 'VbfpW0pbvaU'),
       ('When The Partys Over', 'na1QQbdgTC8'),
       ('Drag Me Down', 'Jwgf3wmiA04'),
       ('Stay With Me', 'pB-5XG-DbAA'),
       ('Malibu', '8j9zMok6two'),
       ('I Dont Wanna Live Foreve', '7F37r50VUTQ'),
       ('Shower', '50-_oTkmF5I'),
       ('She Looks So Perfect', 'X2BYmmTI04I'),
       ('Love Yourself', 'oyEuk8j8imI'),
       ('IDGAF', 'Mgfe5tIwOj0'),
       ('Wolves', 'cH4E_t3m3xM'),
       ('Shout To My Ex', 'yYjIcyc-uWM'),
       ('Theres Nothing Holding Me Back', 'dT2owtxkU8k'),
       ('What About Us', 'ClU3fctbGls'),
       ('Locked Away', '6GUm5g8SG4o'),
       ('Fight Song', 'xo1VInw-SKc'),
       ('Never Be The Same', 'Ph54wQG8ynk'),
       ('Issues', '9Ke4480MicU'),
       ('Symphony', 'aatr_2MstrI'),
       ('Thinking Out Loud', 'lp-EO5I60KA'),
       ('Hurt Somebody', 'ZdsER1S3t8k'),
       ('Dear Future Husband', 'ShlW5plD_40'),
       ('Let It Go', 'L0MK7qz13bU'),
       ('Up', 'rCiBgLOcuKU'),
       ('Let Me Go', 'BQ_0QLL2gqI'),
       ('Love You Like A Love Song', 'EgT_us6AsDg'),
       ('One Call Away', 'BxuY9FET9Y4'),
       ('Love On The Brain', '0RyInjfgNc4'),
       ('Praying', 'v-Dur3uXXCQ'),
       ('Close', 'XgJFqVvb2Ws'),
       ('Black Magic', 'MkElfR_NPBI'),
       ('Rude', 'PIh2xe4jnpk'),
       ('Out Of The Woods', 'JLf9q36UsBk'),
       ('Take Me To Church', 'PVjiKRfKpPI');

-- OBTENER LOS ÁLBUMES POR ARTISTAS
CREATE OR REPLACE VIEW album_artist AS
    SELECT DISTINCT albumes.id_album as id_album, a.id_artista as id_artist
    FROM albumes
        INNER JOIN cancion_album ca on albumes.id_album = ca.id_album
        INNER JOIN canciones c on c.id_cancion = ca.id_canciones
        INNER JOIN artista a on a.id_artista = c.id_artista
    WHERE albumes.activado = TRUE;


-- SIMULACIÓN PARA AGREGAR CANCIONES
CREATE OR REPLACE function songs_simulation(integer)
RETURNS VOID AS
    $BODY$
    DECLARE
        song_name varchar;
        link_song varchar;
        artist_id numeric;
        song_id numeric;
        album_id numeric;
        genre_id numeric;
        is_song numeric;
        counter numeric;
    BEGIN
        counter:= 0;

        WHILE counter < $1 LOOP
            -- RANDOM NAME AND LINK SONG
            SELECT nombre, link INTO song_name, link_song
            FROM songs
            OFFSET floor(random()*(SELECT count(*) FROM songs))
            LIMIT 1;
            -- RANDOM ARTIST
            SELECT id_artista INTO artist_id
            FROM artista
            WHERE  activado = TRUE
            OFFSET floor(random()*(SELECT count(*) FROM artista WHERE activado = TRUE))
            LIMIT 1;
            -- CHECKING IF THE SONG ALREADY EXISTS
            SELECT COUNT(*) INTO is_song
            FROM canciones
            WHERE nombre = song_name AND id_artista = artist_id;
            IF (is_song = 0) THEN
                -- INSERTING A NEW SONG
                INSERT INTO canciones (nombre, link, id_artista, modificador) VALUES (song_name, link_song,artist_id, 'Zara12');

                -- OBTAINING SONG ID
                SELECT id_cancion INTO song_id
                FROM canciones
                WHERE nombre = song_name AND id_artista = artist_id;
                -- OBTAINING RANDOM ALBUM ID
                SELECT id_album INTO album_id
                FROM album_artist
                WHERE id_artist = 1
                OFFSET floor(random()*(SELECT count(*) FROM album_artist WHERE id_artist = 1))
                LIMIT 1;
                -- OBTAINING RANDOM GENRE
                SELECT id_genero INTO genre_id
                FROM genero
                OFFSET floor(random()*(SELECT count(*) FROM genero))
                LIMIT 1;
                INSERT INTO genero_canciones values (genre_id, song_id);
                INSERT INTO cancion_album VALUES (song_id, album_id);
                counter:= counter + 1;
            END IF;
            END LOOP;
    END;
    $BODY$
LANGUAGE 'plpgsql';


SELECT songs_simulation(2);


-------------------- SIMULACIONES

-- OPTION 1
SELECT random()*3
FROM canciones
WHERE id_cancion = floor(random()*3)
LIMIT 1;

-- OPTION 2
-- BEST OPTION
-- RANDOM SONGS
SELECT *
FROM canciones
WHERE estado=TRUE
OFFSET floor(random()*(SELECT count(*) FROM canciones WHERE estado = TRUE))
LIMIT 1;

-- RANDOM USERS
SELECT *
FROM usuarios
WHERE id_tipoUsuario != 1 AND activo = TRUE
OFFSET floor(random()*(SELECT count(*) FROM usuarios WHERE id_tipoUsuario != 1 AND activo = TRUE))
LIMIT 1;


-- TRYING THE EXTENSION
-- THIS DOESNT WORK ON SMALL TABLES
SELECT *  FROM canciones TABLESAMPLE SYSTEM_ROWS(1);

-- SIMULACIÓN PARA ESCUCHAR CANCIONES
CREATE OR REPLACE function streams_simulation(date, integer)
RETURNS VOID AS
    $BODY$
    DECLARE
        user_name varchar;
        id_song numeric;
    BEGIN
        FOR i IN 1..$2 LOOP
            -- RANDOM SONG
            SELECT id_cancion INTO id_song
            FROM canciones
            WHERE estado=TRUE
            OFFSET floor(random()*(SELECT count(*) FROM canciones WHERE estado = TRUE))
            LIMIT 1;
            -- RANDOM USER
            SELECT username INTO user_name
            FROM usuarios
            WHERE id_tipoUsuario != 1 AND activo = TRUE
            OFFSET floor(random()*(SELECT count(*) FROM usuarios WHERE id_tipoUsuario != 1 AND activo = TRUE))
            LIMIT 1;
            INSERT INTO stream VALUES (id_song,user_name, $1);
            END LOOP;
    END;
    $BODY$
LANGUAGE 'plpgsql';


SELECT c.nombre as nombre, a.nombre as artista, g.nombre as genero, CAST(fecha AS VARCHAR) as reproduccion
FROM stream
    INNER JOIN canciones c on c.id_cancion = stream.id_cancion
    INNER JOIN artista a on a.id_artista = c.id_artista
    INNER JOIN genero_canciones gc on c.id_cancion = gc.id_canciones
    INNER JOIN genero g on g.id_genero = gc.id_genero;


-- #2
CREATE TABLE songs(
    nombre VARCHAR(250),
    link VARCHAR(100)
);

INSERT INTO songs
VALUES
       ('All I Want','mtf7hC17IBM'),
       ('Say You Wont Let Go','0yW7w8F2TVA'),
       ('Secret Love', 'qgy7vEje5-w'),
       ('Scars To Your Beautiful','d7s1dMSrZ_E'),
       ('Where Have You Been','HBxt_v0WF6Y'),
       ('Photograph','p1JmzB6E-C8'),
       ('Back To You','-HjpL-Ns6_A'),
       ('Like Im Gonna Lose You','2-MBfn8XjIU'),
       ('Perfect','2Vv-BfVoq4g'),
       ('The Hills','yzTuBuRdAyA'),
       ('Sign Of The Times','qN4ooNx77u0'),
       ('When I Was Your Man','ekzHIouo8Q4'),
       ('Blank Space','e-ORhEE9VVg'),
       ('Lovely','V1Pl8CzNzCw'),
       ('Somebody','8UVNT4wvIGY'),
       ('Million Reasons','en2D_5TzXCA'),
       ('Mercy','KkGVmN68ByU'),
       ('I Like Me Better','a7fzkqLozwA'),
       ('Someone Like You','hLQl3WQQoQ0'),
       ('What A Time','4OxZIyNC6qc'),
       ('You & I','_kqQDCxRCzM'),
       ('Ocean Eyes','viimfQi_pUw'),
       ('The Heart Wants What Wants','ij_0p_6qTss'),
       ('We Dont Talk Anymore','3AtDnEC4zak'),
       ('Steal My Girl','UpsKGvPjAgw'),
       ('All Of Me','450p7goxZqg'),
       ('Just The Way Your Are', 'LjhCEhWiKXk'),
       ('Please Dont Go','KTjHqOIwkow'),
       ('Im Not The Only One','nCkpzqqog4k'),
       ('Treat You Better','lY2yjAdbvdQ'),
       ('Need You now','eM213aMKTHg'),
       ('One Last Time', 'Wg92RrNhB8s'),
       ('History','yjmp8CoZBIo'),
       ('Somebody Else', 'U9NEoHrkldM'),
       ('Love Like You Do', 'AJtDXIazrMo'),
       ('Just Give Me a Reason', 'OpQFFLBMEPI'),
       ('Dancing On My Own', 'q31tGyBJhRY'),
       ('Pillowtalk', 'C_3d6GntKbk'),
       ('Mirros', 'uuZE_IRwLNI'),
       ('Stitches', 'VbfpW0pbvaU'),
       ('When The Partys Over', 'na1QQbdgTC8'),
       ('Drag Me Down', 'Jwgf3wmiA04'),
       ('Stay With Me', 'pB-5XG-DbAA'),
       ('Malibu', '8j9zMok6two'),
       ('I Dont Wanna Live Foreve', '7F37r50VUTQ'),
       ('Shower', '50-_oTkmF5I'),
       ('She Looks So Perfect', 'X2BYmmTI04I'),
       ('Love Yourself', 'oyEuk8j8imI'),
       ('IDGAF', 'Mgfe5tIwOj0'),
       ('Wolves', 'cH4E_t3m3xM'),
       ('Shout To My Ex', 'yYjIcyc-uWM'),
       ('Theres Nothing Holding Me Back', 'dT2owtxkU8k'),
       ('What About Us', 'ClU3fctbGls'),
       ('Locked Away', '6GUm5g8SG4o'),
       ('Fight Song', 'xo1VInw-SKc'),
       ('Never Be The Same', 'Ph54wQG8ynk'),
       ('Issues', '9Ke4480MicU'),
       ('Symphony', 'aatr_2MstrI'),
       ('Thinking Out Loud', 'lp-EO5I60KA'),
       ('Hurt Somebody', 'ZdsER1S3t8k'),
       ('Dear Future Husband', 'ShlW5plD_40'),
       ('Let It Go', 'L0MK7qz13bU'),
       ('Up', 'rCiBgLOcuKU'),
       ('Let Me Go', 'BQ_0QLL2gqI'),
       ('Love You Like A Love Song', 'EgT_us6AsDg'),
       ('One Call Away', 'BxuY9FET9Y4'),
       ('Love On The Brain', '0RyInjfgNc4'),
       ('Praying', 'v-Dur3uXXCQ'),
       ('Close', 'XgJFqVvb2Ws'),
       ('Black Magic', 'MkElfR_NPBI'),
       ('Rude', 'PIh2xe4jnpk'),
       ('Out Of The Woods', 'JLf9q36UsBk'),
       ('Take Me To Church', 'PVjiKRfKpPI');

-- OBTENER LOS ÁLBUMES POR ARTISTAS
CREATE OR REPLACE VIEW album_artist AS
    SELECT DISTINCT albumes.id_album as id_album, a.id_artista as id_artist
    FROM albumes
        INNER JOIN cancion_album ca on albumes.id_album = ca.id_album
        INNER JOIN canciones c on c.id_cancion = ca.id_canciones
        INNER JOIN artista a on a.id_artista = c.id_artista
    WHERE albumes.activado = TRUE;


-- SIMULACIÓN PARA AGREGAR CANCIONES
CREATE OR REPLACE function songs_simulation(integer)
RETURNS VOID AS
    $BODY$
    DECLARE
        song_name varchar;
        link_song varchar;
        artist_id numeric;
        song_id numeric;
        album_id numeric;
        genre_id numeric;
        is_song numeric;
        counter numeric;
    BEGIN
        counter:= 0;

        WHILE counter < $1 LOOP
            -- RANDOM NAME AND LINK SONG
            SELECT nombre, link INTO song_name, link_song
            FROM songs
            OFFSET floor(random()*(SELECT count(*) FROM songs))
            LIMIT 1;
            -- RANDOM ARTIST
            SELECT id_artista INTO artist_id
            FROM artista
            WHERE  activado = TRUE
            OFFSET floor(random()*(SELECT count(*) FROM artista WHERE activado = TRUE))
            LIMIT 1;
            -- CHECKING IF THE SONG ALREADY EXISTS
            SELECT COUNT(*) INTO is_song
            FROM canciones
            WHERE nombre = song_name AND id_artista = artist_id;
            IF (is_song = 0) THEN
                -- INSERTING A NEW SONG
                INSERT INTO canciones (nombre, link, id_artista, modificador) VALUES (song_name, link_song,artist_id, 'Zara12');

                -- OBTAINING SONG ID
                SELECT id_cancion INTO song_id
                FROM canciones
                WHERE nombre = song_name AND id_artista = artist_id;
                -- OBTAINING RANDOM ALBUM ID
                SELECT id_album INTO album_id
                FROM album_artist
                WHERE id_artist = 1
                OFFSET floor(random()*(SELECT count(*) FROM album_artist WHERE id_artist = 1))
                LIMIT 1;
                -- OBTAINING RANDOM GENRE
                SELECT id_genero INTO genre_id
                FROM genero
                OFFSET floor(random()*(SELECT count(*) FROM genero))
                LIMIT 1;
                INSERT INTO genero_canciones values (genre_id, song_id);
                INSERT INTO cancion_album VALUES (song_id, album_id);
                counter:= counter + 1;
            END IF;
            END LOOP;
    END;
    $BODY$
LANGUAGE 'plpgsql';

SELECT streams_simulation('03-13-2019',30);
SELECT songs_simulation(2);






