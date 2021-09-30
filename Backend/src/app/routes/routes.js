const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const pool = require('../../config/database.js');

router.use(passport.initialize());
router.use(passport.session());

////----------------------------------------------LOG IN----------------------------------------------

router.get('/login', (req, res) => {
	if (req.isLoggedIn) {
		res.redirect('/login')
	} else {
		res.render('login')
	}
})

router.post('/login', (req,res) => {
	passport.authenticate('local-login', function(err, user) {
		if (err) { return res.sendStatus(404); }
		if (!user) { return res.sendStatus(404); }
		console.log("Usuario recibido")

	req.logIn(user, function(err) {
		if (err) { return res.sendStatus(404); }
		return res.json(user);
		});
	}) (req, res);
});

router.get('/signup', (req, res) => {
	if (req.isLoggedIn) {
		req.flash('message', 'Your are already logged in.')
		res.redirect('/profile')
	} else {
		res.render('signup')
	}
})

router.post('/agregar_usuario', async (req,res) => {
	await passport.authenticate('local-signup', function(err, user) {
		if (err) { return res.sendStatus(404); }
		if (user == undefined) { return res.sendStatus(404); }
		return res.sendStatus(201); //res.sendStatus(201) para mandar 201 y res.json(user) para mandar usuari
	}) (req, res);
});



// logout
router.get('/logout', (req, res) => {
	req.logout();
	res.sendStatus(201);
});



function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.sendStatus(404);
}

router.get('/ver_privilegios', isLoggedIn, (req, res) => {
	pool.query('SELECT usuario.rut, usuario.nombre, privilegios.gestion_usuario, privilegios.gestion_ficha, privilegios.gestion_priv, privilegios.gestion_evaluacion, privilegios.gestion_infante FROM usuario, privilegios WHERE usuario.rut = privilegios.rut_usuario', (err, result) => {
		if(err){res.sendStatus(404)}
		return res.json(result.rows[0]);
	});
})

module.exports = router;
