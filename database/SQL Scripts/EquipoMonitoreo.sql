SELECT * FROM canciones c2 ;
SELECT * FROM albumes a2 ;
SELECT * FROM artista a2 ;
SELECT * FROM usuarios u2 ;
SELECT * FROM tipo_usuario tu ;
--Modificar la información de cualquier track y álbum del catálogo
INSERT INTO canciones VALUES (2, 'prueba', 'link', 2);
INSERT INTO albumes VALUES (10, 'prueba', '2021-04-27');

UPDATE canciones SET nombre = 'algo' WHERE id_cancion = 2;
UPDATE canciones SET link = 'algo' WHERE id_cancion = 2;
UPDATE canciones SET id_artista = 3 WHERE id_cancion = 2;

UPDATE albumes SET nombre = 'algo' WHERE id_album = 10;
UPDATE albumes SET fecha_publicacion = '2021-04-28' WHERE id_album = 10;
--opcion significa a que tabla modificar, cambio significa que tipo de cambio se va a realizar, id significa el id del atributo a cambiar
--nombre significa el nuevo nombre que se va a colocar, link significa el nuevo link que se le colocara a la cancion
--fecha significa la nueva fecha del album, artista significa el nuevo artista de al cancion
--opcion = 1 modificara la tabla cancion, opcion = cualquier otro numero modificara la tabla album
--cambio = 1 modifica el nombre de una cancion. cambio = 2 modifica el link de la cancion. 
--cambio = 3 modifica el artista de una cancion. cambio = 4 modifica el nombre del album.
--cambio = 5 modifica la fecha de un album
CREATE OR REPLACE FUNCTION modificarAlbumCancion(opcion integer, cambio integer, id integer, nombre TEXT, link TEXT, fecha date, artista integer)  RETURNS void AS $$
    #variable_conflict use_variable
    BEGIN
    	IF opcion = 1 THEN 
    		IF cambio = 1 THEN 
    			UPDATE canciones SET nombre = nombre WHERE id_cancion = id;
    		ELSIF cambio = 2 THEN 
    			UPDATE canciones SET link = link WHERE id_cancion = id;
    		ELSEIF cambio = 3 THEN 
    			UPDATE canciones SET id_artista = artista WHERE id_cancion = id;
    		END IF;
		ELSE
			IF cambio = 4 THEN
				UPDATE albumes SET nombre = nombre WHERE id_album = id;
			ELSEIF cambio = 5 THEN 
				UPDATE albumes SET fecha_publicacion = fecha WHERE id_album = id;
			END IF;
		END IF;
		IF NOT FOUND THEN
        RAISE EXCEPTION 'Error';
    	END IF;
    END;
$$ LANGUAGE plpgsql;
SELECT modificarAlbumCancion(1, 1, 2, 'Probando', NULL, NULL, NULL); --nombre cancion
SELECT modificarAlbumCancion(1, 2, 2, NULL, 'nuevoLink', NULL, NULL); --link cancion
SELECT modificarAlbumCancion(1, 3, 2, NULL, NULL, NULL, 3); --artista cancion
SELECT modificarAlbumCancion(2, 4, 10, 'Probando', NULL, NULL, NULL); --nombre album
SELECT modificarAlbumCancion(2, 5, 10, NULL, NULL, '2020-05-30', NULL); --fecha album
--Desactivar tracks y álbumes
UPDATE canciones SET estado = FALSE WHERE id_cancion = 2;
--Desactivar usuarios sin suscripción para que ya no puedan acceder a la plataforma
--Eliminar suscripciones de usuarios
UPDATE usuarios SET id_tipousuario = 2 WHERE username = 'Prueba';
UPDATE usuarios SET id_tipousuario = 1 WHERE username = 'Prueba';
--Desactivar usuarios registrados como artistas
-- Aqui hay que ver como unir la tabla artista con la de usuarios
UPDATE usuarios SET id_tipousuario = 4 WHERE username = 'Prueba';
UPDATE usuarios SET id_tipousuario = 1 WHERE username = 'Prueba';
--Asociar un usuario existente a perfiles de monitoreo
INSERT INTO tipo_usuario VALUES (6, 'MonitorTipoA');
INSERT INTO tipo_usuario VALUES (7, 'MonitorTipoB');
INSERT INTO tipo_usuario VALUES (8, 'MonitorTipoC');

SELECT * FROM usuarios u2 WHERE username = 'Prueba';
UPDATE usuarios SET id_tipousuario = 6 WHERE username = 'Prueba';
UPDATE usuarios SET id_tipousuario = 7 WHERE username = 'Prueba';
UPDATE usuarios SET id_tipousuario = 8 WHERE username = 'Prueba';
--Generar los reportes ofrecidos por la plataforma
--Consulta de bitácora de operaciones