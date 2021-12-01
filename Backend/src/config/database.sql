create table usuario (
    id_jardin INTEGER,
    rut varchar(10) primary key,
    nombre varchar(80),
    telefono numeric(11,0),
    email varchar(50),
    especialidad varchar(50),
    password text,
    CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id)
);

create table privilegios (
    rut_usuario varchar(10),
    gestion_usuario BOOLEAN,
    gestion_ficha BOOLEAN,
    gestion_priv BOOLEAN,
    gestion_evaluacion BOOLEAN,
    gestion_infante BOOLEAN,
    administrador BOOLEAN,
    CONSTRAINT fk_rut FOREIGN KEY(rut_usuario) REFERENCES usuario(rut)
);

create table horario (
    id SERIAL PRIMARY KEY,
    id_jardin INTEGER,
    rut_usuario varchar(10),
    descripcion text,
    fecha DATE,
    inicio TIME,
    fin TIME,
    sala VARCHAR(30),
    CONSTRAINT fk_jardin FOREIGN KEY(id_jardin) REFERENCES jardin(id),
    CONSTRAINT fk_usuario FOREIGN KEY(rut_usuario) REFERENCES usuario(rut)
);

create table informe (
    id SERIAL PRIMARY KEY,
    rut_usuario varchar(10),
    rut_infante VARCHAR(10),
    fecha DATE,
    CONSTRAINT fk_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
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
    rut varchar(10),
    rut_infante varchar (10),
    nombre varchar(80),
    email varchar (50),
    telefono numeric(11,0),
    CONSTRAINT fk_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
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

insert into horario(id_jardin, rut_usuario, descripcion, fecha, inicio, fin, sala)
values (1, 1, 'Maths', '2021-01-25', '15:00', '18:00', 'Sala 3')

DROP TABLE sesion;
DROP TABLE criterio;
DROP TABLE actividad;
DROP TABLE metodologia;
DROP TABLE evaluacion; 
DROP TABLE objetivo;
DROP TABLE analisis;

DROP TABLE modulo;
DROP TABLE privilegios;
DROP TABLE horario;
DROP TABLE informe;
DROP TABLE apoderado;
DROP TABLE infante; 
DROP TABLE usuario;
DROP TABLE jardin;