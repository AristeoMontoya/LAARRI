const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database'); //carga database.js, de la carpeta src
const helpers = require('./helpers');

passport.use('local.login.academia', new LocalStrategy({
  usernameField: 'clave',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, clave, password, done) => {
  const rows = await pool.query('SELECT * FROM academia WHERE id = ?', [clave]);
  if(rows.length > 0) {
    const academia = rows[0];
    if(password === academia.password) {
      req.user = academia;
      return done(null, academia, req.flash('success', 'Acceso correcto'));
    }
    else {
      return done(null, false, req.flash('message', 'La contraseña ingresada es incorrecta'));
    }
  }
  else {
    return done(null, false, req.flash('message', 'La clave de usuario no está registrada'));
  }
}));

passport.use('local.login.serviciosEscolares', new LocalStrategy({
  usernameField: 'clave',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, clave, password, done) => {
  const rows = await pool.query('SELECT * FROM departamentodeserviciosescolares WHERE id = ?', [clave]);
  if(rows.length > 0) {
    const user = rows[0];
    if(password === user.password) {
      req.user = user;
      return done(null, user, req.flash('success', 'Acceso correcto'));
    }
    else {
      return done(null, false, req.flash('message', 'La contraseña ingresada es incorrecta'));
    }
  }
  else {
    return done(null, false, req.flash('message', 'La clave de usuario no está registrada'));
  }
}));

passport.use('local.login.jefe', new LocalStrategy({
  usernameField: 'clave',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, clave, password, done) => {
  const rows = await pool.query('SELECT * FROM jefe WHERE id = ?', [clave]);
  if(rows.length > 0) {
    const jefe = rows[0];
    if(password === jefe.password) {
      req.user = jefe;
      return done(null, jefe, req.flash('success', 'Acceso correcto, jefazo'));
    }
    else {
      return done(null, false, req.flash('message', 'La contraseña ingresada es incorrecta'));
    }
  }
  else {
    return done(null, false, req.flash('message', 'La clave de usuario no está registrada'));
  }
}));

passport.use('local.login.usuario', new LocalStrategy({
  usernameField: 'clave',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, clave, password, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [clave]);
  if(rows.length > 0) {
    const user = rows[0];
    if(password === user.password) {
      req.user = user;
      return done(null, user, req.flash('success', 'Bienvenido, ' + user.NombreDeUsuario));
    }
    else {
      return done(null, false, req.flash('message', 'La contraseña ingresada es incorrecta'));
    }
  }
  else {
    return done(null, false, req.flash('message', 'La clave de usuario no está registrada'));
  }
}));

passport.use('local.signup.alumno', new LocalStrategy({
  usernameField: 'clave',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, clave, password, done) => {
  const { fullname } = req.body;
  console.log(clave);
  let newUser = {
    clave,
    password,
    NULL,
    NULL,
    NULL,
    email,
    NULL,
    NULL,
    NULL,
    NULL,
    nick
  };
  // guardando en la base de datos
  const result = await pool.query('INSERT INTO usuario SET ?', newUser);
  newUser.id = result.insertId;
  req.user = newUser;
  return done(null, newUser);
}));

passport.use('local.signup.coordinador', new LocalStrategy({
  usernameField: 'clave',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { fullname } = req.body;
  let newUser = {
    clave,
    email,
    password
  };
  // guardando en la base de datos
  const result = await pool.query('INSERT INTO usuario SET ?', newUser);
  newUser.id = result.insertId;
  req.user = newUser;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  var rows;
  if(id.includes('aca')) { // academia
    rows = await pool.query('SELECT * FROM academia WHERE id = ?', [id]);
  }
  else
    if(id === 'jefedejefes') { // servicios escolares
      rows = await pool.query('SELECT * FROM jefe WHERE id = ?', [id]);
    }
    else
      if(id.includes('servicios')) { // servicios escolares
        rows = await pool.query('SELECT * FROM departamentodeserviciosescolares WHERE id = ?', [id]);
      }
      else { // alumno y coordinador
        rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
      }
  done(null, rows[0]);
});
