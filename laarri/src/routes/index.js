// RUTAS DE LA APLICACION
const express = require('express');
const router = express.Router();

router.get('/', (res, req) => {
  req.render('index');
});

module.exports = router;
