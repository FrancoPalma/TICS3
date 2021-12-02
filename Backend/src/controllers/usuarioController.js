const pool = require('../config/database.js');
const bcrypt= require('bcrypt');
usuarioController = {}

usuarioController.getVerPrivilegios = (req, res) => {
	pool.query('SELECT usuario.rut, usuario.nombre, privilegios.gestion_usuario, privilegios.gestion_ficha, privilegios.gestion_priv, privilegios.gestion_evaluacion, privilegios.gestion_infante FROM usuario, privilegios WHERE usuario.rut = privilegios.rut_usuario AND usuario.id_jardin = $1', [req.user.id_jardin], (err, result) => {
		if(err){return res.sendStatus(404)}
		return res.json(result.rows);
	});
};

usuarioController.getVerUsuarios = (req, res) => {
	let id_jardin = req.user.id_jardin;
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
		pool.query('DELETE FROM horario WHERE rut_usuario = $1', [rut_usuario], (err) => {
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
	})
};

usuarioController.postEditarUsuario = (req, res) => {

	let rut_usuario = req.params.rut_usuario
	let nombre = req.body.nombre;
	let telefono = req.body.telefono;
	let email = req.body.email;
	let especialidad = req.body.especialidad;

	let REletras = new RegExp('^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$');
	let REnumeros = new RegExp('^[0-9]+$')
	let REemail = new RegExp('[@]')

	if(REletras.test(nombre) && REletras.test(especialidad) && REnumeros.test(telefono) && REemail.test(email) && telefono.length <= 11 && telefono.length >= 9){
		pool.query('UPDATE usuario SET nombre = $1, telefono = $2, email = $3, especialidad = $4 WHERE usuario.rut = $5', [nombre, telefono, email, especialidad, rut_usuario], (err) => {
			if(err){res.sendStatus(404)}
			return res.sendStatus(200);
		});
	}else{
		return res.sendStatus(405)
	}
};

usuarioController.postEditarPassword = async (req, res) => {
	let rut_usuario = req.params.rut_usuario;
	let password_anterior = req.body.password_antigua;
	let password_nueva = req.body.password_nueva;
	
	pool.query('SELECT password FROM usuario WHERE rut = $1', [rut_usuario], (err, result) => {
		if(err){return res.sendStatus(404)}
		let passHash_anterior = result.rows[0].password
		bcrypt.compare(password_anterior, passHash_anterior, async (err, isValid) => {
			if(isValid){
				let passHash_nueva = await bcrypt.hash(password_nueva, 8);
				pool.query('UPDATE usuario SET password = $1 WHERE usuario.rut = $2', [passHash_nueva, rut_usuario], (err) => {
					if(err){res.sendStatus(404)}
					return res.sendStatus(200);
				});
			}else{
				return res.sendStatus(405)
			}
		})
	})
}

usuarioController.postAgregarUsuario = (req, res) => {
	let RErut = new RegExp('^([0-9][0-9]|[0-9])[0-9][0-9][0-9][0-9][0-9][0-9]-([0-9]|k|K)+$')
	let REletras = new RegExp('^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ]+$');
	let REnumeros = new RegExp('^[0-9]+$')
	let REemail = new RegExp('[@]')

	let rut = req.body.rut;
	let nombre = req.body.nombre;
	let telefono = req.body.telefono;
	let email = req.body.email;
	let especialidad = req.body.especialidad;
	let password = req.body.password
	console.log(rut)
	if(RErut.test(rut) && REletras.test(nombre) && REletras.test(especialidad) && REnumeros.test(telefono) && REemail.test(email) && telefono.length <= 11 && telefono.length >= 9){
		pool.query('SELECT rut FROM usuario WHERE rut = $1', [rut], (err, result) => {
			if(err){return res.sendStatus(404)}
			if(result.rows.length == 0){
				pool.query('SELECT * FROM usuario WHERE rut = $1' , [rut], async (err, usuario) => {
					if (err) {
					return res.sendStatus(404);
					}
					const user = usuario.rows[0]
					if (user != undefined) {
					return res.sendStatus(404);
					} else {
					let passHash = await bcrypt.hash(password, 8);
					pool.query('BEGIN', (err) => {
						if(err){return res.sendStatus(404)}
						pool.query('INSERT INTO usuario (id_jardin, rut, nombre, telefono, email,especialidad, password) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.user.id_jardin, rut, req.body.nombre, req.body.telefono, req.body.email, req.body.especialidad, passHash], (err) => {
						if(err){return res.sendStatus(404);}
						pool.query('INSERT INTO privilegios (rut_usuario, gestion_usuario, gestion_ficha, gestion_priv, gestion_evaluacion, gestion_infante, administrador) VALUES ($1, $2, $3, $4, $5, $6, $7)', [rut, true, true, true, true, true, true], (err) => {
							if(err){return res.sendStatus(404);}
							pool.query('COMMIT', (err) => {
							if (err){return res.sendStatus(404);}
							else{
								return res.sendStatus(200)
							}
							}) 
						})
						})
					})       
					}
				});
			}else{
				return res.sendStatus(406)
			}
		})
	}else{
		return res.sendStatus(405)
	}
}

usuarioController.getVerPerfil= (req, res) => {
	pool.query('SELECT usuario.rut, usuario.nombre, usuario.telefono, usuario.email, usuario.especialidad FROM usuario WHERE usuario.rut = $1', [req.user.rut], (err, result) => {
		if(err){ return res.sendStatus(404)}
		return res.json(result.rows[0])
	})
};


module.exports = usuarioController;