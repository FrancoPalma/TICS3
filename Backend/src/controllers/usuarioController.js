const pool = require('../config/database.js');
usuarioController = {}

usuarioController.getPrivilegios = (req, res) => {

	console.log(req.user)
	pool.query('SELECT usuario.rut, usuario.nombre, privilegios.gestion_usuario, privilegios.gestion_ficha, privilegios.gestion_priv, privilegios.gestion_evaluacion, privilegios.gestion_infante FROM usuario, privilegios WHERE usuario.rut = privilegios.rut_usuario AND usuario.id_jardin = $1', [0], (err, result) => {
		if(err){res.sendStatus(404)}
		return res.json(result.rows);
	});
};

module.exports = usuarioController;