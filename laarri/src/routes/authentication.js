const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('./auth');
const { isNotLoggedIn } = require('./auth');

// SINGUP
router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// SINGIN (login pueh)
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('auth/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  req.check('username', 'El nombre de usuario es requerido').notEmpty();
  req.check('password', 'La contraseña es requerida').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/login');
  }
  passport.authenticate('local.login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;
