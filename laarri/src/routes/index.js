// RUTAS DE LA APLICACION
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./auth');
const { isNotLoggedIn } = require('./auth');
const { isLoggedAcademia } = require('./auth');


router.get('/', isNotLoggedIn, (res, req) => {
  req.render('index');
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

router.get('/serviciosEscolares_bandeja', isLoggedIn, (res, req) => {
  req.render('screens/serviciosEscolares_bandeja');
});

router.get('/estadisticas', isLoggedIn, (res, req) => {
  req.render('screens/jefedejefes');
});

module.exports = router;
