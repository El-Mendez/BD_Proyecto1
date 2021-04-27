-- Usuario sin suscripcion solo reproduce 3 tracks diarios /AGREGAR FECHA
SELECT id_tipoUsuario FROM usuarios; -- Verifico el tipo de usuario
-- Si el usuario no es premium entonces busca la cantidad de canciones escuchadas en el dia
SELECT SUM(ec.cantidad)
FROM escucha_cancion ec
WHERE id_usuario = 'Zara12' AND fecha = now();

SELECT * FROM escucha_cancion WHERE id_usuario = 'Zara12';

-- Update tipo de usuario (cuando el usuario se suscribe y cuenta con suscripcion activa)
UPDATE usuarios SET id_tipoUsuario = 2 WHERE username = 'Zara12';


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

-- ADMINISTRADORES
-- Inactivar canciones del catálogo Update a canciones

-- Update cancion

-- Para modificar un usuario a manager
UPDATE canciones SET id_artista = 2 WHERE nombre = 'Algo2'; -- Para modificar el artista a una cancion

-- Update album

-- Update artista

-- Delete cancion

-- Delete album


-- Delete artista

-- REPORTES PARA EL ADMINISTRADOR

-- DATA PARA EL FRONTEND

-- Info de usuario (Pantalla de configuracion)


-- Canciones agrupadas por generos


-- Playlist creadas por un usario especifico

SELECT * FROM usuario_playlist up ;

-- Desglozar canciones de una playlist


-- Desglozar canciones de un album


-- Albums por artista
;

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