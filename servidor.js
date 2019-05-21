var express = require("express");
var aplicacion = express(); // este guapo es el servidor, creo
aplicacion.listen(8989); // puerto en que el servidor jalará. Normalmente es el 8080 uwu
// INCIO
aplicacion.get("/", pantallaInicio);
aplicacion.get("/Login", pantallaLogin);
aplicacion.get("/Registrarse", pantallaRegistrarse);
aplicacion.get("/Recuperar-contraseña", pantallaRecuperarContra);
// ALUMNO
aplicacion.get("Usuario/Tablero", pantallaTableroAlumno);
aplicacion.get("Usuario/Solicitar-de-convalidación", pantallaSolicitudConvalidacion);
// COORDINADOR
aplicacion.get("Usuario/Bandeja-de-entrada", pantallaBandejaDeEntradaCoordinador);
aplicacion.get("Usuario/Enviar-dictamen", pantallaEnviarDictamen);
aplicacion.get("Usuario/Solicitar-analisis", pantallaSolicitarAnalisis);
// ALUMNO-COORDINADOR
aplicacion.get("Usuario/Actualizar-perfil", pantallaActualizarPerfil);
aplicacion.get("Comentarios", pantallaComentarios);
// JEFE DE DIVISIÓN DE ESTUDIOS PROFESIONALES
aplicacion.get("Jefe/Estadtisticas", pantallaEstadtisticas);
// ACADEMIA
aplicacion.get("Academia/Bandeja-de-entrada", pantallaBandejaDeEntradaAcademia);
aplicacion.get("Academia/Enviar-analisis", pantallaEnviarAnalisis);
// DEPARTAMENTO DE SERVICIOS ESCOLARES
aplicacion.get("Servicios-Escolares/Bandeja-de-entrada", pantallaBandejaDeEntradaServiciosEscolares);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////      INICIO      //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pantallaInicio(peticion, resultado) {
  resultado.send("Inicio");
}
function pantallaLogin(peticion, resultado) {
  resultado.send("Login");
}
function pantallaRegistrarse(peticion, resultado) {
  resultado.send("registrarse");
}
function pantallaRecuperarContra(peticion, resultado) {
  resultado.send("Recuperar contraseña");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////      AlUMNO      //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pantallaTableroAlumno(peticion, resultado) {
  resultado.send("Tablero");
}
function pantallaSolicitudConvalidacion(peticion, resultado) {
  resultado.send("Solicitar de convalidación");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////      COORDINADOR      ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pantallaBandejaDeEntradaCoordinador(peticion, resultado) {
  resultado.send("Bandeja de entrada del coordinador");
}
function pantallaEnviarDictamen(peticion, resultado) {
  resultado.send("Enviar dictamen de convalidación");
}
function pantallaSolicitarAnalisis(peticion, resultado) {
  resultado.send("Solicitar análisis académico");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////       ALUMNO-COORDINADOR       ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pantallaActualizarPerfil(peticion, resultado) {
  resultado.send("Actualizar o personalizar perfil pues yatusabe");
}
function pantallaComentarios(peticion, resultado) {
  resultado.send("Envíe sus comentarios a Stultus Solutions, seguro los leemos algún día xd");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////       JEFE DE DIVISIÓN DE ESTUDIOS       ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pantallaEstadtisticas(peticion, resultado) {
  resultado.send("Estadísticas de todo papi ya tu sabe, algo clásico y maracatón como el campeón");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////       ACADEMIA       /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pantallaBandejaDeEntradaAcademia(peticion, resultado) {
  resultado.send("Bandeja de entrada para academia papá");
}
function pantallaEnviarAnalisis(peticion, resultado) {
  resultado.send("Enviar ANAL ISIS académico");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////       DEPARTAMENTO DE SERVICIOS ESCOLARES       //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pantallaBandejaDeEntradaServiciosEscolares(peticion, resultado) {
  resultado.send("Bandeja de entrada para el departamento de cemento xd");
}
