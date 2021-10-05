const passport = require('../config/passport');

const sesionController = {}

sesionController.getLogin = (req, res) => {
	res.render('login')

}

sesionController.postLogin = (req,res) => {
	passport.authenticate('local-login', function(err, user) {
		if (err) { return res.sendStatus(404); }
		if (user == undefined) { return res.sendStatus(404); }
		
		req.logIn(user, function(err) {
			if (err) { return res.sendStatus(404); }
			return res.json(req.user);
		});
	}) (req, res);
};

sesionController.getSignup = (req, res) => {
	res.render('signup')
}

sesionController.postSignup = async (req,res) => {
	await passport.authenticate('local-signup', function(err, user) {
		if (err) { console.log(err)
			return res.sendStatus(404); }
		if (user == false) { 
			console.log(user)
			return res.sendStatus(404); }
		return res.sendStatus(201);
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
	res.sendStatus(404);
}

module.exports = sesionController;


