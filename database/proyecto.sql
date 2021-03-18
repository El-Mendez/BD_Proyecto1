CREATE DATABASE superPatitos;

CREATE TABLE tipo_usuario (
    id_tipoUsuario SERIAL PRIMARY KEY,
    descripcion VARCHAR (100) NOT NULL
);

CREATE TABLE suscripcion(
    Id_suscripción SERIAL PRIMARY KEY,
    Fecha_inicio DATE NOT NULL,
    Fecha_vencimiento DATE NOT NULL
);

CREATE TABLE artista (
    Id_artista Serial Primary Key,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE canciones (
    id_cancion SERIAL PRIMARY KEY ,
    Nombre VARCHAR (40) NOT NULL ,
    link VARCHAR (50) NOT NULL,
    id_artista INT,
    id_género INT,

    CONSTRAINT tipoArtista
        FOREIGN KEY (id_artista)
        REFERENCES artista(id_artista),

    CONSTRAINT tipoGenero
        FOREIGN KEY (id_artista)
        REFERENCES artista(id_artista)
);

CREATE TABLE playlist(
    id_playlist SERIAL PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL
);

CREATE TABLE albumes (
    id_album SERIAL PRIMARY KEY,
    nombre VARCHAR (50) NOT NULL
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

CREATE table genero (
    id_género SERIAL PRIMARY KEY,
    Nombre VARCHAR (50)
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

CREATE TABLE usuarios(
    username VARCHAR(150) NOT NULL PRIMARY KEY,
    contraseña VARCHAR(150) NOT NULL,
    nombres VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    correo  VARCHAR(150) NOT NULL,
    id_suscripción INT,
    id_tipoUsuario INT,

    CONSTRAINT tipoUsuario
        FOREIGN KEY (id_suscripción)
        REFERENCES tipo_usuario(id_tipoUsuario),

    CONSTRAINT subscripcion
         FOREIGN KEY (id_suscripción)
         REFERENCES suscripcion(Id_suscripción)
);