const express = require('express');
const app = express();


const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Pool = require('./config/database.js')
var cors = require('cors');


//Setting
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secreto'
}));

app.use(passport.initialize());
app.use(passport.session());

//Rutas
sesion = require('./routes/sesion');
usuario = require('./routes/usuario');
informe = require('./routes/informe')
infante = require('./routes/infante');
horario = require('./routes/horario');

app.use('/sesion', sesion);
app.use('/usuario', usuario);
app.use('/informe', informe);
app.use('/infante', infante);
app.use('/horario', horario);

//Starting the server

app.listen(app.get('port'), () => {
  console.log('Server on port');
});
