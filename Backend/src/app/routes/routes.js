const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const pool = require('./database.js');

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
		if (err) { return console.log(err); }
		console.log(user);
		});
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

router.post('/eliminar_pedido/:id', isLoggedIn, async function(req,res){
    let id = req.params.id;
		await pool.quey(id, async function(err, pedido){
			let numero_pedido = pedido.numero_pedido;
	    await eliminarPedido.remove({_id: id}, async function(err){
				await registro.create({fecha: Date.now(), tipo: 'Pedido', numero: numero_pedido, detalle: 'Se eliminó un pedido', empleadoLog: req.user.rut, sucursal: req.user.sucursal}, function (err){
					if(!err){
						res.sendStatus(201);
					}
					else{
						 res.sendStatus(404);
					}
				});
	    });
	});
});

module.exports = router;
