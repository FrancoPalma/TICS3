create table usuario (
rut numeric(8,0) primary key,
nombre varchar(80),
telefono numeric(11,0),
email varchar(50),
especialidad varchar(50),
password text
);

<<<<<<< HEAD
create table privilegios (
    rut_usuario numeric(8,0),
    gestion_usuario BOOLEAN,
    gestion_ficha BOOLEAN,
    gestion_priv BOOLEAN,
    gestion_evaluacion BOOLEAN,
    gestion_infante BOOLEAN,
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
    id INTEGER PRIMARY KEY,
    rut_infante VARCHAR(10),
    metodologia TEXT,
    CONSTRAINT fk_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
);

create table evaluacion (
    id INTEGER PRIMARY KEY,
    id_informe INTEGER,
    nombre TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table objetivo (
    id INTEGER PRIMARY KEY,
    id_informe INTEGER,
    nombre TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table analisis (
    id_informe INTEGER,
    conclusion TEXT,
    recomendacion TEXT,
    CONSTRAINT fk_informe FOREIGN KEY(id_informe) REFERENCES informe(id)
);

create table jardin(
id interger,
nombre varchar(80),
telefono numeric(11,0),
direccion varchar(50),
email varchar(50),
rut_admin (8,0),
CONSTRAINT fk_id FOREIGN KEY(id)
)

create table infante(
    id_jardin interger primary key,
    rut varchar(10),
    nombre varchar(80),
    fecha_nacimiento date,
    ficha_clinica bytea,
    CONSTRAINT fk_rut_infante FOREIGN KEY(rut)
)

create table apoderado(
    rut varchar(10) primary key,
    rut_infante varchar (10),
    nombre varchar(80),
    email varchar (50),
    telefono numeric(11,0),
    CONSTRAINT fk_rut_infante FOREIGN KEY(rut_infante) REFERENCES infante(rut)
)

create table modulo (
    id_jardin interger primary key,
    duracion numeric(10,0),
    comienzo time,
    fin time
)

insert into usuario(rut,nombre,telefono,email,especialidad, password)
values (1,'franco',56123456789,'hola@gmail.com','fonoaudiologo', 'hola');

insert into usuario(rut, password)
values (1,'hola');
