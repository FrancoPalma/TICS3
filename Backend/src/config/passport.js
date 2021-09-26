const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const pool = require('./database.js');
const bcrypt= require('bcrypt');

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
  async function (req, rut, password, done) {
    await pool.query('SELECT * FROM usuario WHERE rut = $1' , [rut], (err, usuario) => {
      if (err) {
        return done(err);
      }
      if (usuario) {
        return done(null, false);
      } else {
        let passHash = bcrypt.hash(password, 8);
        pool.query('INSERT INTO usuario (rut, password) VALUES ($1, $2)', [rut, passHash], (err, result) => {
          if (err){return done(null,false)}
          else{
            done(null, result)
          }
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
