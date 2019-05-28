const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database'); //carga database.js, de la carpeta src
const helpers = require('./helpers');

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if(rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);
    if(validPassword) {
      return done(null, user, req.flash('success', 'Bienvenido, ' + user.username));
    }
    else {
      return done(null, false, req.flash('message', 'La contraseña ingresada es incorrecta'));
    }
  }
  else {
    return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { fullname } = req.body;
  let newUser = {
    fullname,
    username,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  // guardando en la base de datos
  const result = await pool.query('INSERT INTO users SET ?', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});
