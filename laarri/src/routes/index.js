// RUTAS DE LA APLICACION
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./auth');
const { isNotLoggedIn } = require('./auth');
const { isLoggedAcademia } = require('./auth');
const pool = require('../database'); //carga database.js, de la carpeta src


router.get('/', isNotLoggedIn, (res, req) => {
  req.render('index');
});

router.get('/listado_estadisticas', (res, req) => {
  req.render('screens/Estadisticas-coordinador');
});

router.get('/comentarios', (res, req) => {
  req.render('screens/comentarios');
});

router.get('/academia_bandeja', isLoggedAcademia, (res, req) => {
  req.render('screens/academia_bandeja');
});

router.get('/coordinador_bandeja', isLoggedIn, (res, req) => {
  req.render('screens/coordinador_bandeja');
});

router.get('/serviciosEscolares_bandeja', isLoggedIn, async (res, req) => {
  const academia = await pool.query('SELECT * FROM Academia');
  console.log(academia);
  req.render('partials/portaMensaje', { academia });
});

router.get('/estadisticas', isLoggedIn, (res, req) => {
  req.render('screens/jefedejefes');
});

router.get('/MensajeSolicitudDeConvalidacion', isLoggedIn, (res, req) => {
  req.render('screens/MensajeSolicitudDeConvalidacion');
});

module.exports = router;
