const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const pool = require('./database.js');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

  // Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'rut',
    passwordField: 'password',
    passReqToCallback : true 
  },
  function (req, rut, password, done) {
    Usuario.findOne({'rut': req.body.rut}, function (err, usuario) {
      if (err) {
        return done(err);
      }
      if (usuario) {
        return done(null, false, req.flash('signupMessage', 'the rut is already taken'));
      } else {
        var newUsuario = new Usuario();
        newUsuario.rut = rut;
        newUsuario.nombre = req.body.nombre;
        newUsuario.telefono = req.body.telefono;
        newUsuario.rol = req.body.rol;
        newUsuario.sucursal = req.body.sucursal;
        newUsuario.password = newUsuario.generateHash(password);
        newUsuario.gestion_empleado = req.body.gestion_empleado;
        newUsuario.gestion_inventario = req.body.gestion_inventario;
        newUsuario.gestion_privilegios = req.body.gestion_privilegios;
        newUsuario.descuento_permitido = req.body.descuento_permitido;
        newUsuario.ver_totales = req.body.ver_totales;
        newUsuario.save(function (err) {
          if (err) { throw err; }
          return done(null, newUsuario);
        });
      }
    });
  }));
  
passport.use('local-login', new LocalStrategy({
  usernameField: 'rut',
  passwordField: 'password',
  passReqToCallback: true
},
async function (req, rut, password, done) {
  await pool.query('SELECT * FROM usuario WHERE rut = $1' , [rut], (err, result) => {
    if (err) { return done(err); }
    if (!result) {
      return done(null, false, req.flash('loginMessage', 'No User found'))
    }
    const user = result.rows[0];
    console.log(user)
    if(password != user.password){
      return done(null,false)
    }
    return done(null, result);
  });
}));

module.exports = passport;
