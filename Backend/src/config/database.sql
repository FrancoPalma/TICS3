create table usuario (
id_jardin INTEGER,
rut numeric(8,0) primary key,
nombre varchar(80),
telefono numeric(11,0),
email varchar(50),
especialidad varchar(50),
password text,
CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id)
);

create table privilegios (
    rut_usuario numeric(8,0),
    gestion_usuario BOOLEAN,
    gestion_ficha BOOLEAN,
    gestion_priv BOOLEAN,
    gestion_evaluacion BOOLEAN,
    gestion_infante BOOLEAN,
    administrador BOOLEAN,
    CONSTRAINT fk_rut FOREIGN KEY(rut_usuario) REFERENCES usuario(rut)
);

create table horario (
    rut_usuario numeric(8,0),
    descripcion DATE,
    fecha DATE,
    hora TIME,
    sala VARCHAR(30),
    CONSTRAINT fk_rut FOREIGN KEY(rut_usuario) REFERENCES usuario(rut)
);

create table informe (
    id SERIAL PRIMARY KEY,
    rut_usuario numeric(8,0),
    rut_infante VARCHAR(10),
    CONSTRAINT fk_rut FOREIGN KEY(rut_usuario) REFERENCES usuario(rut),
    CONSTRAINT fk_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
);

create table metodologia (
    id SERIAL PRIMARY KEY,
    id_informe INTEGER,
    descripcion TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table evaluacion (
    id SERIAL PRIMARY KEY,
    id_informe INTEGER,
    nombre TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table objetivo (
    id SERIAL PRIMARY KEY,
    id_informe INTEGER,
    descripcion TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table sesion (
    id_metodologia INTEGER,
    nombre VARCHAR(50),
    descripcion TEXT,
    CONSTRAINT fk_evaluacion FOREIGN KEY(id_metodologia) REFERENCES metodologia(id)
);

create table analisis (
    id_informe INTEGER,
    conclusion TEXT,
    recomendacion TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table criterio (
    id_evaluacion INTEGER,
    nombre VARCHAR(50),
    descripcion TEXT,
    puntaje INTEGER,
    CONSTRAINT fk_evaluacion FOREIGN KEY(id_evaluacion) REFERENCES evaluacion(id)
);

create table actividad (
    id_objetivo INTEGER,
    descripcion TEXT,
    CONSTRAINT fk_objetivo FOREIGN KEY(id_objetivo) REFERENCES objetivo(id)
);

create table jardin(
id SERIAL PRIMARY KEY,
nombre varchar(80),
telefono numeric(11,0),
direccion varchar(50),
email varchar(50),
rut_admin NUMERIC(8,0)
);

create table infante(
    id_jardin INTEGER,
    rut varchar(10) PRIMARY KEY,
    nombre varchar(80),
    fecha_nacimiento date,
    ficha_clinica bytea,
    CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id)
);

create table apoderado(
    rut varchar(10) primary key,
    rut_infante varchar (10),
    nombre varchar(80),
    email varchar (50),
    telefono numeric(11,0),
    CONSTRAINT fk_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
);

create table modulo (
    id_jardin INTEGER,
    duracion numeric(10,0),
    comienzo time,
    fin time,
    CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id)
);

insert into usuario(id_jardin,rut,nombre,telefono,email,especialidad, password)
values (0,0,'Admin',0,'admin','admin', 'admin');

insert into jardin(id,nombre,telefono,direccion,email,rut_admin)
values (1,'Centro nunca más solos','56992509584','Av. Cristóbal Colón 8220, Las Condes','centronuncamassolos@gmail.com',0);

insert into jardin(id)
values (0);

insert into infante(id_jardin, rut, nombre, fecha_nacimiento)
values (1,'12345678-9', 'Juanito Perez', '1999-01-12');

insert into informe(rut_usuario, rut_infante, fecha, completado)
values (1, '12345678-9', '2021-12-27', false);

insert into metodologia(id_informe, descripcion)
values (14, 'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis, arcu id accumsan maximus, ante nulla luctus nunc, at accumsan tellus nisl ac lacus. Proin ut consequat nulla. Ut eu est sed ligula consequat hendrerit. Ut quis ullamcorper ipsum, et tincidunt ligula. Suspendisse nec nunc in nunc viverra blandit. Nam turpis ipsum, auctor vel consequat ');

insert into evaluacion(id_informe, nombre)
values (14, 'Evaluación auditiva');

insert into evaluacion(id_informe, nombre)
values (14, 'Evaluación motora');

insert into objetivo(id_informe, descripcion)
values (14, 'Mover el bote en todas las discos prrraaa');

insert into objetivo(id_informe, descripcion)
values (14, 'Mover el bote en todas las discos prrraaa');

insert into analisis(id_informe, conclusion, recomendacion)
values (14, 'n elementum neque nec laoreet varius. Curabitur semper mattis nisi, in posuere leo tempus id. Cras vulputate, neque ut ornare facilisis, leo nunc accumsan diam, ac lacinia libero odio at diam. Ut elementum varius velit, et tempor felis vestibulum ut. Mauris ut nisl eu velit consectetur iaculis vel at m', 'n elementum neque nec laoreet varius. Curabitur semper mattis nisi, in posuere leo tempus id. Cras vulputate, neque ut ornare facilisis, leo nunc accumsan diam, ac lacinia libero odio at diam. Ut elementum varius velit, et tempor felis vestibulum ut. Mauris ut nisl eu velit consectetur iaculis vel at m');

insert into sesion(id_metodologia, nombre, descripcion)
values (1, 'Primera sesion', 'Aenean vitae tortor erat. Fusce ut elementum nulla, sit amet tempor nisi. Vivamus sit amet ullamcorper tortor. Duis bibendum facilisis blandit. Sed finibus facilisis malesuada. ');

insert into sesion(id_metodologia, nombre, descripcion)
values (1, 'Segunda sesion', 'Aenean vitae tortor erat. Fusce ut elementum nulla, sit amet tempor nisi. Vivamus sit amet ullamcorper tortor. Duis bibendum facilisis blandit. Sed finibus facilisis malesuada. ');

insert into criterio(id_evaluacion, nombre, descripcion, puntaje)
values (1, 'Lejos', 'Aenean vitae tortor erat. Fu', 10);

insert into criterio(id_evaluacion, nombre, descripcion, puntaje)
values (1, 'Cerca', 'Aenean vitae tortor erat. Fu', 5);

insert into criterio(id_evaluacion, nombre, descripcion, puntaje)
values (2, 'Caminar', 'Aenean vitae tortor erat. Fu', 5);

insert into criterio(id_evaluacion, nombre, descripcion, puntaje)
values (2, 'Correr', 'dgdfgawrgsrtjyuk7rtritae tortor erat. Fu', 8);

insert into actividad(id_objetivo, descripcion)
values (1, 'Twerk every day');

insert into actividad(id_objetivo, descripcion)
values (1, 'Twerk every day');

insert into actividad(id_objetivo, descripcion)
values (1, 'm quis diam finibus, vel semper urna dapibus. Praesent sodales at diam id efficitur. Proin consequat dignissim tortor, et tincidunt ligula ultrices eu. Sed sit amet dapibus te');

insert into actividad(id_objetivo, descripcion)
values (1, 'm quis diam finibus, vel semper urna dapibus. Praesent sodales at diam id efficitur. Proin consequat dignissim tortor, et tincidunt ligula ultrices eu. Sed sit amet dapibus te');

insert into actividad(id_objetivo, descripcion)
values (2, 'm quis diam finibus, vel semper urna dapibus. Praesent sodales at diam id efficitur. Proin consequat dignissim tortor, et tincidunt ligula ultrices eu. Sed sit amet dapibus te');

insert into actividad(id_objetivo, descripcion)
values (2, 'm quis diam finibus, vel semper urna dapibus. Praesent sodales at diam id efficitur. Proin consequat dignissim tortor, et tincidunt ligula ultrices eu. Sed sit amet dapibus te');


DROP TABLE sesion;
DROP TABLE criterio;
DROP TABLE actividad;
DROP TABLE metodologia;
DROP TABLE evaluacion; 
DROP TABLE objetivo;
DROP TABLE analisis;