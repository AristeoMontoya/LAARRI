const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');
const validator = require('express-validator');
const bodyParser = require('body-parser'); // no se para que es esto

const { database } = require('./keys');

// INICIALIZACIONES
  const app = express();
  require('./lib/passport');

// CONFIGURACION
  app.set('port', process.env.PORT || 6969);
  app.set('views', path.join(__dirname, 'views'))
  app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  }));
  app.set('view engine', '.hbs');

// MIDDLEWARE
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(session({
    secret: "sesion_owo",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
  }));
  app.use(flash());
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(express.json());
  app.use(validator());
  app.use(passport.initialize());
  app.use(passport.session());

// VARIABLES GLOBALES
  app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
  });

// RUTAS
  app.use(require('./routes'));
  app.use(require('./routes/authentication'));


// PUBLIC (no se al chile xD)
  app.use(express.static(path.join(__dirname, 'public')));

// INICIANDO EL SERVIDOR
  app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto ', app.get('port'));
  });
