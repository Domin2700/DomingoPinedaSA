create database DomingoPinedaSA
use DomingoPinedaSA

create table Cliente(
IdCliente int identity primary key,
Nombres nvarchar(50) not null,
Apellidos nvarchar(50) not null,
Cedula nvarchar(11) not null unique,
[Enable] bit 
);

create table Provincia (
IdProvincia int identity primary key,
Nombre nvarchar(50),
[Enable] bit 
);

create table Direccion (
IdDireccion int identity primary key,
Calle nvarchar(50) not null,
Sector nvarchar(50) not null,
Municipio nvarchar(50),
IdProvincia int foreign key references Provincia(IdProvincia),
IdCliente int foreign key references Cliente(IdCliente),
[Enable] bit
);