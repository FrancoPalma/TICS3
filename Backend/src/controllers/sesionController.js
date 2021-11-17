const passport = require('../config/passport');

const sesionController = {}

sesionController.postLogin = (req,res) => {
	passport.authenticate('local-login', function(err, user) {
		if (err) { return res.sendStatus(404); }
		if (user == undefined || user == false) { return res.sendStatus(404); }
		
		req.logIn(user, function(err) {
			if (err) { return res.sendStatus(404); }
			return res.json(user);
		});
	}) (req, res);
};

sesionController.postSignupAdmin = async (req,res) => {
	await passport.authenticate('local-signup-admin', function(err, user) {
		if (err) {return res.sendStatus(404); }
		if (user == false) {
			return res.sendStatus(404); }
		return res.sendStatus(200);
	}) (req, res);
};

sesionController.postSignup = async (req,res) => {
	await passport.authenticate('local-signup', function(err, user) {
		console.log(user)
		if (err) { return res.sendStatus(404); }
		if (user == false) { 
			return res.sendStatus(404); }
		return res.sendStatus(200);
	}) (req, res);
};

sesionController.getLogout = (req, res) => {
	req.logout();
	res.sendStatus(200);
};

sesionController.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.sendStatus(404);
}

sesionController.gestionUsuario = (req, res, next) => {
	if(req.user.gestion_usuario){
		return next();
	}
	return res.sendStatus(404);
};

sesionController.gestionPriv = (req, res, next) => {
	if(req.user.gestion_priv){
		return next();
	}
	return res.sendStatus(404);
};

sesionController.gestionInfante = (req, res, next) => {
	if(req.user.gestion_infante){
		return next();
	}
	return res.sendStatus(404);
};

sesionController.gestionFicha = (req, res, next) => {
	if(req.user.gestion_ficha){
		return next();
	}
	return res.sendStatus(404);
};

sesionController.gestionEvaluacion = (req, res, next) => {
	if(req.user.gestion_evaluacion){
		return next();
	}
	return res.sendStatus(404);
};

sesionController.gestionHorario = (req, res, next) => {
	if(req.user.gestion_horario){
		return next();
	}
	return res.sendStatus(404);
};

module.exports = sesionController;


