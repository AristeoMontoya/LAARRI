const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('./auth');
const { isNotLoggedIn } = require('./auth');

// SINGUP
router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('screens/signup');
});

router.post('/signup', isNotLoggedIn, (req, res, next) => {
  req.check('nick', 'El nombre de usuario es requerido').notEmpty();
  req.check('clave', '¡Necesitamos su número de control!').notEmpty();
  req.check('email', 'El correo es requerido').notEmpty();
  req.check('email', 'Se necesita un email válido').isEmail(),
  req.check('password', 'La contraseña es requerida').notEmpty();
  req.check('nick', 'Un nombre de usuario no supera los 50 caracteres.').isLength({ min: 1, max:50 });
  req.check('clave', 'Una clave de usuario no supera los 12 caracteres.').isLength({ min: 1, max:12 });
  req.check('email', 'Un correo de usuario no supera los 50 caracteres.').isLength({ min: 1, max:50 });
  req.check('password', 'Una contraseña no supera los 30 caracteres.').isLength({ min: 1, max:30 });
const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signup');
  }
  console.log(req.params);
  if(clave.length == 8) { // un número de control tiene 8 digitos
    passport.authenticate('local.signup.alumno', {
      successRedirect: '/coordinador_bandeja',
      failureRedirect: '/signup',
      failureFlash: true
    })(req, res, next);
  }
  else {
    passport.authenticate('local.signup.coordinador', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
    })(req, res, next);
  }
});

// SINGIN (login pueh)
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('screens/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  req.check('clave', 'El nombre de usuario es requerido').notEmpty();
  req.check('password', 'La contraseña es requerida').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/login');
  }
  if(req.body.clave.includes('aca')) { // academia
    passport.authenticate('local.login.academia', {
      successRedirect: '/academia_bandeja',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  }
  else {
    if(req.body.clave.includes('servicios')) { // servicios escolares
      passport.authenticate('local.login.serviciosEscolares', {
        successRedirect: '/serviciosEscolares_bandeja',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
    }
    else {
      if(req.body.clave === 'jefedejefes') { // servicios escolares
        passport.authenticate('local.login.jefe', {
          successRedirect: '/estadisticas',
          failureRedirect: '/login',
          failureFlash: true
        })(req, res, next);
      }
      else {
        if(req.body.clave.length == 8) { // alumno
          passport.authenticate('local.login.usuario', {
            successRedirect: '/perfil',
            failureRedirect: '/login',
            failureFlash: true
          })(req, res, next);
        }
        else { // coordinador
            passport.authenticate('local.login.usuario', {
              successRedirect: '/coordinador_bandeja',
              failureRedirect: '/login',
              failureFlash: true
            })(req, res, next);
        }
      }
    }
  }
});

router.get('/perfil', isLoggedIn, (req, res) => {
  res.render('perfil');
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;
