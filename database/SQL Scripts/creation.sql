CREATE EXTENSION pgcrypto;

CREATE TABLE tipo_usuario
(
    id_tipoUsuario SERIAL PRIMARY KEY,
    descripcion    VARCHAR(100) NOT NULL
);

CREATE TABLE usuarios
(
    username       VARCHAR(150) NOT NULL PRIMARY KEY,
    contrasena     VARCHAR(150) NOT NULL,
    nombres        VARCHAR(150) NOT NULL,
    apellidos      VARCHAR(150) NOT NULL,
    correo         VARCHAR(150) NOT NULL UNIQUE,
    id_tipoUsuario INT DEFAULT 1,

    CONSTRAINT fk_tipoUsuario
        FOREIGN KEY (id_tipoUsuario)
            REFERENCES tipo_usuario (id_tipoUsuario)
);

CREATE TABLE suscripcion
(
    id_suscripcion    SERIAL PRIMARY KEY,
    id_usuario        VARCHAR(150),
    fecha_inicio      DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,

    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuarios (username)
);

CREATE TABLE artista
(
    Id_artista Serial Primary Key,
    nombre     VARCHAR(50) NOT NULL
);

CREATE table genero
(
    id_genero SERIAL PRIMARY KEY,
    nombre    VARCHAR(50) NOT NULL
);

CREATE TABLE albumes
(
    id_album          SERIAL PRIMARY KEY,
    nombre            VARCHAR(50) NOT NULL,
    fecha_publicacion DATE NOT NULL
);

CREATE TABLE canciones
(
    id_cancion SERIAL PRIMARY KEY,
    nombre     VARCHAR(40) NOT NULL,
    link       VARCHAR(50) NOT NULL,
    id_artista INT,
    estado     BOOLEAN DEFAULT TRUE,

    CONSTRAINT artista_fk
        FOREIGN KEY (id_artista)
            REFERENCES artista (id_artista) ON DELETE CASCADE

);

CREATE TABLE playlist
(
    id_playlist SERIAL PRIMARY KEY,
    nombre      VARCHAR(250) NOT NULL
);

CREATE TABLE usuario_playlist
(
    id_usuario  VARCHAR(150),
    id_playlist INT,
    PRIMARY KEY (id_usuario, id_playlist),

    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuarios (username) ON DELETE CASCADE,

    CONSTRAINT fk_pl
        FOREIGN KEY (id_playlist)
            REFERENCES playlist (id_playlist) ON DELETE CASCADE
);

CREATE table playlist_canciones
(
    id_playlist  INT,
    id_canciones INT,

    PRIMARY KEY (id_playlist, id_canciones),

    CONSTRAINT fk_playlist
        FOREIGN Key (id_playlist)
            REFERENCES playlist (id_playlist) ON DELETE CASCADE,

    CONSTRAINT fk_canciones
        FOREIGN Key (id_canciones)
            REFERENCES canciones (id_cancion) ON DELETE CASCADE
);

CREATE TABLE cancion_album
(
    id_canciones INT,
    id_album     INT,
    PRIMARY KEY (id_album, id_canciones),

    CONSTRAINT fk_canciones
        FOREIGN Key (id_canciones)
            REFERENCES canciones (id_cancion) ON DELETE CASCADE,

    CONSTRAINT fk_album
        FOREIGN Key (id_album)
            REFERENCES albumes (id_album) ON DELETE CASCADE

);

CREATE TABLE genero_canciones
(
    id_genero    INT,
    id_canciones INT,
    PRIMARY KEY (id_genero, id_canciones),

    CONSTRAINT fk_genero
        FOREIGN Key (id_genero)
            REFERENCES genero (id_genero) ON DELETE CASCADE,
    CONSTRAINT fk_cancion
        FOREIGN Key (id_canciones)
            REFERENCES canciones (id_cancion) ON DELETE CASCADE
);

CREATE TABLE stream
(
    id_cancion INT,
    id_usuario VARCHAR(150),
    fecha      date NOT NULL,

    CONSTRAINT fk_cancion
        FOREIGN KEY (id_cancion)
            REFERENCES canciones (id_cancion) ON DELETE CASCADE,

    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuarios (username) ON DELETE CASCADE
);
