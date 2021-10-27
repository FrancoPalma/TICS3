const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const sesionController = require('../controllers/sesionController.js')

router.get('/ver_privilegios', usuarioController.getVerPrivilegios);

router.get('/ver_datos', usuarioController.getVerDatos);

router.post('/editar_privilegios/:rut_usuario', usuarioController.postEditarPrivilegios);

router.post('/eliminar_usuario/:rut_usuario', usuarioController.postEliminarUsuario)

router.post('/editar_usuario/:rut_usuario', usuarioController.postEditarUsuario);

router.post('/editar_password/:rut_usuario', usuarioController.postEditarPassword);

module.exports = router;