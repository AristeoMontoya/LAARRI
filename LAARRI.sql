 drop database LAARRI;
create database LAARRI;
use LAARRI;

-- //////////// alumno y coordinador
create table Carrera(
	CarreraID varchar(10) PRIMARY KEY,
    Nombre varchar(30) NOT NULL
);
create table Usuario(
	UsuarioID varchar(12) PRIMARY KEY,
	Contraseña varchar(30) NOT NULL,
    ApellidoPaterno varchar(20) NOT NULL,
	ApellidoMaterno varchar(20),
    Nombre varchar(50) NOT NULL,
	Correo varchar(50) NOT NULL,
    FotoDePerfil varchar(100),
    EsCoordinador boolean NOT NULL, -- true para coordinadores, false para alumnos
    NuevaCarrera varchar(30), -- Esto siempre es nulo si se trata de el coordinador
    FOREIGN KEY(NuevaCarrera) REFERENCES Carrera(CarreraID)
);
create table UsuarioCarrera(
	UsuarioID varchar(12),
	CarreraID varchar(10),
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

-- //////////// alumno
create table PantallaSolicitarConvalidacion( -- tabla de recuperación de datos de la pantalla de la solicitud de abajo
	AlumnoID varchar(12), -- esto se llena automáticamente cuando un usuario se crea
    NuevaCarrera varchar(30),
    FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
    PRIMARY KEY(AlumnoID)
);
create table MensajeSolicitudDeConvalidacion( -- mensaje que el alumno envía al coordinador para realizar la solicitud de convalidación de estudios
	AlumnoID varchar(12),
    CarreraDeOrigen varchar(30) NOT NULL,
    CarreraSolicitada varchar(30) NOT NULL,
    FechaDeRealizacion datetime NOT NULL,
	FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
	FOREIGN KEY(CarreraDeOrigen) REFERENCES Carrera(CarreraID),
	FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
    PRIMARY KEY(AlumnoID, CarreraSolicitada) -- Si se rechaza la solicitud en una carrera el alumno siempre puede realizar una para otra carrera, pero no para la que se le rechazo
);
create table Movimientos(
	AlumnoID varchar(12),
    CarreraSolicitada varchar(30) NOT NULL,
    Estado bit, -- 0 para la revisión del coordinador, 1 para el analisis académico
    FechaDeInicio datetime NOT NULL,
    FechaDeFinalizacion datetime,
    EnProceso boolean NOT NULL, -- en caso de ser true se muestra "en proceso" la wea; de ser falso pues ya se acabó o al coordinador/academia le vale y no ha ni habierto tu solicitud
    Aceptado boolean, -- si es null es porque aún no se acabó la wea
	FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
	FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
    PRIMARY KEY(AlumnoID, CarreraSolicitada, Estado) -- Si se rechaza la solicitud en una carrera el alumno siempre puede realizar una para otra carrera, pero no para la que se le rechazo
);
create table Estado(
	AlumnoID varchar(12),
    CarreraSolicitada varchar(30) NOT NULL,
    Estado varchar(20),
    FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
	FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
    PRIMARY KEY(AlumnoID, CarreraSolicitada) -- Si se rechaza la solicitud en una carrera el alumno siempre puede realizar una para otra carrera, pero no para la que se le rechazo
);


-- //////////// coordinador
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
	ClaveDeAcceso varchar(12) PRIMARY KEY,
    Contraseña varchar(30) NOT NULL
);
create table Academia(
	ClaveDeAcceso varchar(12) PRIMARY KEY,
    Contraseña varchar(30) NOT NULL
);
create table PantallaEnviarAnalisisAcademico(
	ClaveDeAcceso varchar(12),
    AlumnoID varchar(12),
    Documento varchar(100),
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
    Documento varchar(100) NOT NULL,
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
    CarreraSolicitada varchar(30) NOT NULL,
    Estado varchar(20),
    FechaDeInicio datetime NOT NULL,
    FechaDeFinalizacion datetime,
    FOREIGN KEY(AlumnoID) REFERENCES Usuario(UsuarioID),
	FOREIGN KEY(ClaveDeTrabajador) REFERENCES Usuario(UsuarioID),
    FOREIGN KEY(CarreraSolicitada) REFERENCES Carrera(CarreraID),
    PRIMARY KEY(NumeroDeSolicitud)
);

-- esta última wea es sólo para poder hacer el diagrama en una página, no lo ocupamos para la base de datos como tal uwu
 SELECT 'mysql' dbms,t.TABLE_SCHEMA,t.TABLE_NAME,c.COLUMN_NAME,c.ORDINAL_POSITION,c.DATA_TYPE,c.CHARACTER_MAXIMUM_LENGTH,n.CONSTRAINT_TYPE,k.REFERENCED_TABLE_SCHEMA,k.REFERENCED_TABLE_NAME,k.REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.TABLES t LEFT JOIN INFORMATION_SCHEMA.COLUMNS c ON t.TABLE_SCHEMA=c.TABLE_SCHEMA AND t.TABLE_NAME=c.TABLE_NAME LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE k ON c.TABLE_SCHEMA=k.TABLE_SCHEMA AND c.TABLE_NAME=k.TABLE_NAME AND c.COLUMN_NAME=k.COLUMN_NAME LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS n ON k.CONSTRAINT_SCHEMA=n.CONSTRAINT_SCHEMA AND k.CONSTRAINT_NAME=n.CONSTRAINT_NAME AND k.TABLE_SCHEMA=n.TABLE_SCHEMA AND k.TABLE_NAME=n.TABLE_NAME WHERE t.TABLE_TYPE='BASE TABLE' AND t.TABLE_SCHEMA NOT IN('INFORMATION_SCHEMA','mysql','performance_schema');
