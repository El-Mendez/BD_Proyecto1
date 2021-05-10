CREATE EXTENSION pgcrypto;

CREATE TABLE tipo_usuario
(
    id_tipoUsuario SERIAL PRIMARY KEY,
    descripcion    VARCHAR(100) NOT NULL
);

CREATE TABLE manager
(
    id_manager SERIAL PRIMARY KEY,
    nombre     VARCHAR(150) NOT NULL
);

CREATE TABLE artista
(
    id_artista SERIAL PRIMARY KEY,
    nombre     VARCHAR(50) NOT NULL,
    id_manager INT,
    activado   BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_id_manager
        FOREIGN KEY (id_manager)
        REFERENCES manager(id_manager)
);

CREATE TABLE monitores
(
    id_monitor SERIAL PRIMARY KEY,
    nombre     VARCHAR(150) NOT NULL
);

CREATE TABLE usuarios
(
    username       VARCHAR(150) NOT NULL PRIMARY KEY,
    contrasena     VARCHAR(150) NOT NULL,
    nombres        VARCHAR(150) NOT NULL,
    apellidos      VARCHAR(150) NOT NULL,
    correo         VARCHAR(150) NOT NULL UNIQUE,
    id_tipoUsuario INT NOT NULL DEFAULT 1,
    id_monitor     INT,
    id_artista     INT UNIQUE,
    activo         BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_tipoUsuario
        FOREIGN KEY (id_tipoUsuario)
        REFERENCES tipo_usuario (id_tipoUsuario),

    CONSTRAINT fk_id_monitor
        FOREIGN KEY (id_monitor)
        REFERENCES monitores(id_monitor),

    CONSTRAINT fk_id_artista
        FOREIGN KEY (id_artista)
        REFERENCES artista(id_artista)
);

CREATE TABLE tareas (
    id_tarea SERIAL PRIMARY KEY,
    descripcion VARCHAR(150) NOT NULL
);

CREATE TABLE monitor_tarea(
    id_monitor INT NOT NULL,
    id_tarea INT NOT NULL,

    PRIMARY KEY (id_monitor, id_tarea),

    CONSTRAINT fk_monitor
        FOREIGN KEY (id_monitor)
        REFERENCES monitores(id_monitor),

    CONSTRAINT fk_tarea
        FOREIGN KEY (id_tarea)
        REFERENCES tareas(id_tarea)
);

CREATE TABLE suscripcion
(
    id_suscripcion    SERIAL PRIMARY KEY,
    id_usuario        VARCHAR(150) NOT NULL,
    fecha_inicio      DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,

    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios (username)
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
    fecha_publicacion DATE        NOT NULL,
    activado          BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE canciones
(
    id_cancion SERIAL PRIMARY KEY,
    nombre     VARCHAR(40) NOT NULL,
    link       VARCHAR(50) NOT NULL,
    id_artista INT NOT NULL,
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
    id_usuario  VARCHAR(150) NOT NULL,
    id_playlist INT NOT NULL,
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
    id_playlist  INT NOT NULL,
    id_canciones INT NOT NULL,

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
    id_canciones INT NOT NULL,
    id_album     INT NOT NULL,
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
    id_genero    INT NOT NULL,
    id_canciones INT NOT NULL,
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
    id_cancion INT NOT NULL,
    id_usuario VARCHAR(150) NOT NULL,
    fecha      DATE NOT NULL,

    CONSTRAINT fk_cancion
        FOREIGN KEY (id_cancion)
            REFERENCES canciones (id_cancion) ON DELETE CASCADE,

    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
            REFERENCES usuarios (username) ON DELETE CASCADE
);

CREATE TABLE bitacora
(
    fecha DATE              NOT NULL,
    username VARCHAR(150)   NOT NULL,
    operacion VARCHAR(100)  NOT NULL,
    tabla VARCHAR(100)      NOT NULL,
    elemento VARCHAR(100)   NOT NULL,

    PRIMARY KEY (*),

    CONSTRAINT fk_username
        FOREIGN KEY (username)
        REFERENCES usuarios(username)
);
