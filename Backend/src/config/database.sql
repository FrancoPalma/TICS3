create table usuario (
rut numeric(8,0) primary key,
nombre varchar(80),
telefono numeric(11,0),
email varchar(50),
especialidad varchar(50),
password text
);

insert into usuario(rut,nombre,telefono,email,especialidad, password)
values (1,'franco',56123456789,'hola@gmail.com','fonoaudiologo', 'hola');

insert into usuario(rut, password)
values (1,'hola');
