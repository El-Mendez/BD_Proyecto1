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
    correo  VARCHAR(150) NOT NULL,
    id_tipoUsuario INT,

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

    CONSTRAINT tipoArtista
        FOREIGN KEY (id_artista)
        REFERENCES artista(id_artista)

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
    REFERENCES usuarios(username),

  CONSTRAINT playlistTieneusuario
     FOREIGN KEY (id_playlist)
     REFERENCES playlist(id_playlist)
);

CREATE table playlist_canciones (
    id_playlist INT,
    id_canciones INT,

    PRIMARY KEY (id_playlist, id_canciones),
    CONSTRAINT idPlayList
        FOREIGN Key (id_playlist)
        REFERENCES playlist(id_playlist),
    CONSTRAINT idCanciones
        FOREIGN Key (id_canciones)
        REFERENCES canciones(id_cancion)
);

CREATE TABLE cancion_album(
    id_canciones INT,
     id_album INT,
    PRIMARY KEY (id_album, id_canciones),

    CONSTRAINT idCanciones
        FOREIGN Key (id_canciones)
        REFERENCES canciones(id_cancion),

    CONSTRAINT idAlbum
        FOREIGN Key (id_album)
        REFERENCES albumes(id_album)

);

CREATE TABLE genero_canciones(
    id_genero INT,
    id_canciones INT,
    PRIMARY KEY (id_genero, id_canciones),

    CONSTRAINT idGenero
        FOREIGN Key (id_genero)
        REFERENCES genero(id_genero),
    CONSTRAINT idCanciones
        FOREIGN Key (id_canciones)
        REFERENCES canciones(id_cancion)
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
       ('Filthy','watch?v=4ORVDPVA-UY',1),
       ('Midnight Summer Jam','watch?v=URTtLCNoHXU',1),
       ('Sauce','watch?v=DLgzY8uL86U',1),
       ('Man of the Woods','watch?v=W1HSG8qW0f4',1),
       ('Higher Higher','https://www.youtube.com/watch?v=0cA_0MOcYGg',1),
       ('Wave','watch?v=vhiScmcP1Sw',1),
       ('Supplies','watch?v=cMIWOx66l4w',1),
       ('Flannel','watch?v=ajehuvVNxxo',1),
       ('Montana','watch?v=BD0F1ETLzJ4',1),
       ('Breeze Off the Pond','watch?v=L_QExPc1Ziw',1),
       ('Young Man','watch?v=0wtf_q3J_vE',1);

