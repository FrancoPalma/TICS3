const pool = require('../config/database.js');
const bcrypt= require('bcrypt');
usuarioController = {}

usuarioController.getVerPrivilegios = (req, res) => {
	pool.query('SELECT usuario.rut, usuario.nombre, privilegios.gestion_usuario, privilegios.gestion_ficha, privilegios.gestion_priv, privilegios.gestion_evaluacion, privilegios.gestion_infante FROM usuario, privilegios WHERE usuario.rut = privilegios.rut_usuario AND usuario.id_jardin = $1', [1], (err, result) => {
		if(err){res.sendStatus(404)}
		return res.json(result.rows);
	});
};

usuarioController.getVerDatos = (req, res) => {
	let id_jardin = req.user.id_jardin;
	console.log(req.user)
	pool.query('SELECT usuario.rut, usuario.nombre, usuario.telefono, usuario.email, usuario.especialidad FROM usuario WHERE usuario.id_jardin = $1', [id_jardin], (err, result) => {
		if(err){ return res.sendStatus(404)}
		return res.json(result.rows)
	})
};

usuarioController.postEditarPrivilegios = (req, res) => {

	let rut_usuario = req.params.rut_usuario;
	let gestion_usuario = req.body.gestion_usuario;
	let gestion_ficha = req.body.gestion_ficha;
	let gestion_priv = req.body.gestion_priv;
	let gestion_evaluacion = req.body.gestion_evaluacion;
	let gestion_infante = req.body.gestion_infante;

	pool.query('UPDATE privilegios SET gestion_usuario = $1, gestion_ficha = $2, gestion_priv = $3, gestion_evaluacion = $4, gestion_infante = $5 WHERE privilegios.rut_usuario = $6', [gestion_usuario, gestion_ficha, gestion_priv, gestion_evaluacion, gestion_infante, rut_usuario], (err) => {
		if(err){ return res.sendStatus(404)}
		return res.sendStatus(200);
	});
};

usuarioController.postEliminarUsuario = (req, res) => {
	let rut_usuario = req.params.rut_usuario;

	pool.query('BEGIN', (err) => {
		if(err){return res.sendStatus(404)}
		pool.query('DELETE FROM privilegios WHERE rut_usuario = $1', [rut_usuario], (err) => {
			if(err){return res.sendStatus(404)}
			pool.query('DELETE FROM usuario WHERE usuario.rut = $1', [rut_usuario], (err) => {
				if(err){return res.sendStatus(404)}
				pool.query('COMMIT', (err)=> {
					if(err){return res.sendStatus(404)}
					return res.sendStatus(200);
				})
			});
		})
	})
};

usuarioController.postEditarUsuario = (req, res) => {

	let rut_usuario = req.params.rut_usuario
	let nombre = req.body.nombre;
	let telefono = req.body.telefono;
	let email = req.body.email;

	pool.query('UPDATE usuario SET nombre = $1, telefono = $2, email = $3 WHERE usuario.rut = $4', [nombre, telefono, email, rut_usuario], (err) => {
		if(err){res.sendStatus(404)}
		return res.sendStatus(200);
	});
};

usuarioController.postEditarPassword = async (req, res) => {
	let rut_usuario = req.params.rut_usuario;
	let password = req.body.password;
	
	let passHash = await bcrypt.hash(password, 8);

	pool.query('UPDATE usuario SET password = $1 WHERE usuario.rut = $2', [passHash, rut_usuario], (err) => {
		if(err){res.sendStatus(404)}
		return res.sendStatus(200);
	});
}



module.exports = usuarioController;