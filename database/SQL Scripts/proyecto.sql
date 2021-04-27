CREATE EXTENSION pgcrypto;

CREATE TABLE tipo_usuario (
    id_tipoUsuario SERIAL PRIMARY KEY,
    descripcion VARCHAR (100) NOT NULL
);


CREATE TABLE usuarios(
    username VARCHAR(150) NOT NULL PRIMARY KEY,
    contraseña VARCHAR(150) NOT NULL,
    nombres VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    correo  VARCHAR(150) NOT NULL UNIQUE,
    id_tipoUsuario INT DEFAULT 1,

    CONSTRAINT tipoUsuario
        FOREIGN KEY (id_tipoUsuario)
        REFERENCES tipo_usuario(id_tipoUsuario)

);

CREATE TABLE suscripcion(
    Id_suscripción SERIAL PRIMARY KEY,
    id_usuario VARCHAR(150),
    Fecha_inicio DATE NOT NULL,
    Fecha_vencimiento DATE NOT NULL,

    CONSTRAINT usuario_tiene_suscripcion
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(username)
);

CREATE TABLE artista (
    Id_artista Serial Primary Key,
    nombre VARCHAR(50) NOT NULL
);

CREATE table genero (
    id_genero SERIAL PRIMARY KEY,
    nombre VARCHAR (50)
);

CREATE TABLE albumes (
    id_album SERIAL PRIMARY KEY,
    nombre VARCHAR (50) NOT NULL
);

CREATE TABLE canciones (
    id_cancion SERIAL PRIMARY KEY ,
    nombre VARCHAR (40) NOT NULL ,
    link VARCHAR (50) NOT NULL,
    id_artista INT,
    estado BOOLEAN DEFAULT TRUE,

    CONSTRAINT tipoArtista
        FOREIGN KEY (id_artista)
        REFERENCES artista(id_artista) ON DELETE CASCADE

);

CREATE TABLE playlist(
    id_playlist SERIAL PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL
);

CREATE TABLE usuario_playlist(
  id_usuario VARCHAR(150),
  id_playlist INT,
  PRIMARY KEY (id_usuario,id_playlist),

  CONSTRAINT usuatioTieneplaylist
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(username) ON DELETE CASCADE,

  CONSTRAINT playlistTieneusuario
     FOREIGN KEY (id_playlist)
     REFERENCES playlist(id_playlist) ON DELETE CASCADE
);

CREATE table playlist_canciones (
    id_playlist INT,
    id_canciones INT,

    PRIMARY KEY (id_playlist, id_canciones),

    CONSTRAINT idPlayList
        FOREIGN Key (id_playlist)
        REFERENCES playlist(id_playlist) ON DELETE CASCADE,

    CONSTRAINT idCanciones
        FOREIGN Key (id_canciones)
        REFERENCES canciones(id_cancion) ON DELETE CASCADE
);

CREATE TABLE cancion_album(
    id_canciones INT,
     id_album INT,
    PRIMARY KEY (id_album, id_canciones),

    CONSTRAINT idCanciones
        FOREIGN Key (id_canciones)
        REFERENCES canciones(id_cancion) ON DELETE CASCADE,

    CONSTRAINT idAlbum
        FOREIGN Key (id_album)
        REFERENCES albumes(id_album) ON DELETE CASCADE

);

CREATE TABLE genero_canciones(
    id_genero INT,
    id_canciones INT,
    PRIMARY KEY (id_genero, id_canciones),

    CONSTRAINT idGenero
        FOREIGN Key (id_genero)
        REFERENCES genero(id_genero) ON DELETE CASCADE,
    CONSTRAINT idCanciones
        FOREIGN Key (id_canciones)
        REFERENCES canciones(id_cancion) ON DELETE CASCADE
);

CREATE TABLE escucha_cancion (
    id_cancion INT,
    id_usuario VARCHAR (150),
    fecha date NOT NULL,
    cantidad int NOT NULL,

    CONSTRAINT cancionEscuchada
        FOREIGN KEY (id_cancion)
        REFERENCES canciones(id_cancion) ON DELETE CASCADE,

    CONSTRAINT usuarioEscucha
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(username) ON DELETE CASCADE
);


INSERT INTO tipo_usuario (descripcion)
VALUES
       ('Freemium'),
       ('Premium'),
       ('Admin');

INSERT INTO usuarios
VALUES
       ('Zara12',crypt('noSequePoner', gen_salt('bf')),'Zaray','Corado','zaraylopez13@gmail.com',3),
       ('El_Mendez',crypt('noSequePoner', gen_salt('bf')),'Pablo','Méndez','zaraylopez13@gmail.com',2),
       ('Orlando13',crypt('noSequePoner1', gen_salt('bf')),'Orlando','Cabrera','zaraylopez13@gmail.com',2),
       ('J_Traitor',crypt('noSequePoner2', gen_salt('bf')),'JJ','Hurtarte','zaraylopez13@gmail.com',2),
       ('Ale_Mora',crypt('noSequePoner3', gen_salt('bf')),'Alejandro','Morales','zaraylopez13@gmail.com',2),
       ('Osberto',crypt('noSequePoner4', gen_salt('bf')),'Osberto','Mejía','zaraylopez13@gmail.com',1);

INSERT INTO suscripcion(id_usuario, Fecha_inicio, Fecha_vencimiento)
VALUES
       ('El_Mendez','02-02-2020','05-02-2020'),
       ('Orlando13','02-15-2020','05-15-2020'),
       ('J_Traitor','02-20-2020','05-20-2020'),
       ('Ale_Mora','02-25-2020','05-25-2020');

INSERT INTO artista (nombre)
VALUES
       ('Justin Timberlake'),
       ('Sam Smith');

INSERT INTO genero (nombre)
VALUES
       ('Jazz'),
       ('Soul'),
       ('Blues'),
       ('Salsa'),
       ('R&B'),
       ('Tango'),
       ('Pop'),
       ('Rock'),
       ('Punk'),
       ('Metal'),
       ('Country'),
       ('Rap'),
       ('Hip Hop'),
       ('Rock and Roll'),
       ('Gospel'),
       ('Reggae'),
       ('Reggaeton'),
       ('Bachata'),
       ('Electrónica'),
       ('Samba');

INSERT INTO albumes (nombre)
VALUES
       ('Love Goes'),
       ('In The Lonely Hour'),
       ('Man of the Woods'),
       ('The Book of Love');

INSERT INTO canciones (nombre, link, id_artista)
VALUES
       ('Filthy','4ORVDPVA-UY',1),
       ('Midnight Summer Jam','URTtLCNoHXU',1),
       ('Sauce','DLgzY8uL86U',1),
       ('Man of the Woods','W1HSG8qW0f4',1),
       ('Higher Higher','0cA_0MOcYGg',1),
       ('Wave','vhiScmcP1Sw',1),
       ('Supplies','cMIWOx66l4w',1),
       ('Flannel','ajehuvVNxxo',1),
       ('Montana','BD0F1ETLzJ4',1),
       ('Breeze Off the Pond','L_QExPc1Ziw',1),
       ('Young Man','0wtf_q3J_vE',1);

-- QUERIES

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