const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const pool = require('./database.js');
const bcrypt= require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, {
    jardin: user.jardin,
    rut: user.rut,
    nombre: user.nombre,
    telefono: user.telefono,
    especialidad: user.especialidad
  });
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
  async function (req, rut, password, done) {
    await pool.query('SELECT * FROM usuario WHERE rut = $1' , [rut], async (err, usuario) => {
      if (err) {
        return done(err);
      }
      const user = usuario.rows[0]
      if (user != undefined) {
        return done(null, false);
      } else {
        let passHash = await bcrypt.hash(password, 8);
        pool.query('BEGIN', (err) => {
          pool.query('INSERT INTO usuario (id_jardin, rut, nombre, telefono, email,especialidad, password) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.body.id_jardin, rut, req.body.nombre, req.body.telefono, req.body.email, req.body.especialidad, passHash], (err) => {
            if(err){return done(null,false)}
            pool.query('INSERT INTO privilegios (rut_usuario, gestion_usuario, gestion_ficha, gestion_priv, gestion_evaluacion, gestion_infante, administrador) VALUES ($1, $2, $3, $4, $5, $6, $7)', [rut, true, true, true, true, true,true], (err) => {
              if(err){return done(null,false)}
              pool.query('COMMIT', (err, result) => {
                if (err){return done(null,false)}
                else{
                  done(null, result)
                }
              }) 
            })
          })
        })       
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
    const user = result.rows[0];
    if (user == undefined) {
      return done(null, false)
    }
    bcrypt.compare(password, user.password, (err, isValid) => {
      if(!isValid){return done(null,false)}
      else{
        return done(null, user);
      }
    });
  });
}));

module.exports = passport;
