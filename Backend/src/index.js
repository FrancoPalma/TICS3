const express = require('express');
const app = express();


const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const Pool = require('./config/database.js')


//Setting
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secreto'
}));

app.use(flash());

//Rutas
router = require('./app/routes/routes');
app.use('/', router)
//require('./app/routes', routes(passport));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Starting the server

app.listen(app.get('port'), () => {
  console.log('Server on port');
});
