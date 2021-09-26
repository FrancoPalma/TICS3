const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const pool = require('../../config/database.js');

router.use(passport.initialize());
router.use(passport.session());

router.get('/inicio', isLoggedIn, (req, res) => {
	let dia = dia()
	let semana = semama();
	res.json({
		dia: dia,
		semana: semana
	})
});

////----------------------------------------------LOG IN----------------------------------------------

router.get('/login', (req, res) => {
	if (req.isLoggedIn) {
		req.flash('message', 'Your are already logged in.')
		res.redirect('/profile')
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

router.get('/singup', (req, res) => {
	if (req.isLoggedIn) {
		req.flash('message', 'Your are already logged in.')
		res.redirect('/profile')
	} else {
		res.render('singup')
	}
})

router.post('/singup', async (req,res) => {
	await passport.authenticate('local-signup', function(err, user) {
		if (err) { return res.sendStatus(404); }
		if (!user) { return res.sendStatus(404); }
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
	res.redirect('/');
}

module.exports = router;
