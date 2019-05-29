// RUTAS DE LA APLICACION
const express = require('express');
const router = express.Router();

router.get('/', (res, req) => {
  req.render('index');
});

router.get('/comentarios', (res, req) => {
  req.render('screens/comentarios');
});

router.get('/academia_bandeja', (res, req) => {
  req.render('screens/academia_bandeja');
});

router.get('/coordinador_bandeja', (res, req) => {
  req.render('screens/coordinador_bandeja');
});

router.get('/serviciosEscolares_bandeja', (res, req) => {
  req.render('screens/serviciosEscolares_bandeja');
});

router.get('/estadisticas', (res, req) => {
  req.render('screens/jefedejefes');
});

module.exports = router;
