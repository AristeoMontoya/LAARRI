create database LAARRI;
use LAARRI;

create table Carrera(
	CarreraID varchar(15),
  Nombre varchar(30) NOT NULL,
  PRIMARY KEY(CarreraID)
);
create table Usuario(
	UsuarioID varchar(12),
	Contraseña varchar(30) NOT NULL,
  ApellidoPaterno varchar(20) NOT NULL,
	ApellidoMaterno varchar(20),
  Nombre varchar(50) NOT NULL,
	Correo varchar(50) NOT NULL,
  FotoDePerfil varchar(100),
  EsCoordinador boolean NOT NULL,
  NuevaCarrera varchar(15),
  FOREIGN KEY(NuevaCarrera) REFERENCES Carrera(CarreraID),
  PRIMARY KEY(UsuarioID)
);
create table UsuarioCarrera(
	UsuarioID varchar(12),
	CarreraID varchar(15),
  FOREIGN KEY(CarreraID) REFERENCES Carrera(CarreraID),
  FOREIGN KEY(UsuarioID) REFERENCES Usuario(UsuarioID),
  PRIMARY KEY(UsuarioID, CarreraID)
);
create table PantallaConfigurarPerfil(
	UsuarioID varchar(12),
  NuevaFotoDePerfil varchar(100),
  NuevoCorreo varchar(50),
  FOREIGN KEY(UsuarioID) REFERENCES Usuario(UsuarioID),
	PRIMARY KEY(UsuarioID)
);

create table PantallaSolicitarConvalidacion(
	AlumnoID varchar(12),
  NuevaCarrera varchar(30),
  CONSTRAINT fk_1 FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  PRIMARY KEY(AlumnoID)
);
create table MensajeSolicitudDeConvalidacion(
	AlumnoID varchar(12),
  CarreraDeOrigen varchar(15) NOT NULL,
  CarreraSolicitada varchar(15) NOT NULL,
  FechaDeRealizacion datetime NOT NULL,
	FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
	FOREIGN KEY(CarreraDeOrigen) REFERENCES Carrera(CarreraID),
	FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
  PRIMARY KEY(AlumnoID, CarreraSolicitada)
);
create table Movimientos(
	AlumnoID varchar(12),
  CarreraSolicitada varchar(15) NOT NULL,
  Estado bit,
  FechaDeInicio datetime NOT NULL,
  FechaDeFinalizacion datetime,
  EnProceso boolean NOT NULL,
  Aceptado boolean,
	FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
	FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
  PRIMARY KEY(AlumnoID, CarreraSolicitada, Estado)
);
create table Estado(
	AlumnoID varchar(12),
  CarreraSolicitada varchar(15) NOT NULL,
  Estado varchar(20),
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
	FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
  PRIMARY KEY(AlumnoID, CarreraSolicitada)
);


create table PantallaEnviarDictamen(
	ClaveDeTrabajador varchar(12),
  AlumnoID varchar(12),
  Comentario varchar(500),
  Documento varchar(100),
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(ClaveDeTrabajador) REFERENCES Usuario(UsuarioID),
  PRIMARY KEY(ClaveDeTrabajador)
);
create table MensajeConDictamen(
	ClaveDeTrabajador varchar(12),
  AlumnoID varchar(12),
  Documento varchar(100) NOT NULL,
  Comentario varchar(500),
  FechaDeEmision datetime NOT NULL,
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(ClaveDeTrabajador) REFERENCES Usuario(UsuarioID),
  PRIMARY KEY(ClaveDeTrabajador, AlumnoID)
);
create table PantallaSolicitarAnalisisAcademico(
	ClaveDeTrabajador varchar(12),
  AlumnoID varchar(12),
  Comentario varchar(500),
  Documento varchar(100),
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(ClaveDeTrabajador) REFERENCES Usuario(UsuarioID),
  PRIMARY KEY(ClaveDeTrabajador)
);

create table MensajeSolicitudDeAnalisisAcademico(
	ClaveDeTrabajador varchar(12),
  AlumnoID varchar(12),
  Comentario varchar(500),
  Documento varchar(100),
  Fecha datetime NOT NULL,
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(ClaveDeTrabajador) REFERENCES Usuario(UsuarioID),
  PRIMARY KEY(ClaveDeTrabajador, AlumnoID)
);


create table DepartamentoDeServiciosEscolares(
	ClaveDeAcceso varchar(12),
  Contraseña varchar(30) NOT NULL,
  PRIMARY KEY(ClaveDeAcceso)
);
create table Academia(
	ClaveDeAcceso varchar(12),
  Contraseña varchar(30) NOT NULL,
  Carrera varchar(15) NOT NULL,
  FOREIGN KEY(Carrera) REFERENCES Carrera(CarreraID),
  PRIMARY KEY(ClaveDeAcceso)
);
create table PantallaEnviarAnalisisAcademico(
	ClaveDeAcceso varchar(12),
  AlumnoID varchar(12),
  Estado varchar(10),
  NombreDeQuienLoElabora varchar(50),
  Comentario varchar(500),
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(ClaveDeAcceso) REFERENCES Academia(ClaveDeAcceso),
  PRIMARY KEY(ClaveDeAcceso)
);
create table MensajeAnalisisAcademico(
	ClaveDeAcceso varchar(12),
  AlumnoID varchar(12) NOT NULL,
  Estado varchar(10) NOT NULL,
  NombreDeQuienLoElabora varchar(50) NOT NULL,
  Comentario varchar(500),
  FechaDeEmision datetime NOT NULL,
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(ClaveDeAcceso) REFERENCES Academia(ClaveDeAcceso),
  PRIMARY KEY(ClaveDeAcceso)
);


create table SolicitudDeConvalidacion(
	NumeroDeSolicitud int,
	AlumnoID varchar(12),
  ClaveDeTrabajador varchar(12),
  CarreraSolicitada varchar(15) NOT NULL,
  Estado varchar(20),
  FechaDeInicio datetime NOT NULL,
  FechaDeFinalizacion datetime,
  FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(ClaveDeTrabajador) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
  PRIMARY KEY(NumeroDeSolicitud)
);
