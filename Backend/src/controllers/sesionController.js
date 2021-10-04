const passport = require('../config/passport');

const sesionController = {}

sesionController.getLogin = (req, res) => {
	if (req.isLoggedIn) {
		res.redirect('/login')
	} else {
		res.render('login')
	}
}

sesionController.postLogin = (req,res) => {
	passport.authenticate('local-login', function(err, user) {
		if (err) { return res.sendStatus(404); }
		if (user == undefined) { return res.sendStatus(404); }
		
		req.logIn(user, function(err) {
			if (err) { return res.sendStatus(404); }
			return res.json({
				jardin: user.jardin,
				rut: user.rut,
				nombre: user.nombre,
				telefono: user.telefono,
				especialidad: user.especialidad
			});
		});
	}) (req, res);
};

sesionController.getSignup = (req, res) => {
	if (req.isLoggedIn) {
		res.redirect('/profile')
	} else {
		res.render('signup')
	}
}

sesionController.postSignup = async (req,res) => {
	await passport.authenticate('local-signup', function(err, user) {
		if (err) { return res.sendStatus(404); }
		if (user == undefined) { return res.sendStatus(404); }
		return res.sendStatus(201); //res.sendStatus(201) para mandar 201 y res.json(user) para mandar usuari
	}) (req, res);
};

// logout
sesionController.getLogout = (req, res) => {
	req.logout();
	res.sendStatus(201);
};

sesionController.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	console.log(req.user)
	res.sendStatus(404);
}

module.exports = sesionController;


