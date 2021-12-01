const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const sesionController = require('../controllers/sesionController.js');

router.get('/ver_privilegios', sesionController.isLoggedIn, sesionController.gestionPriv, usuarioController.getVerPrivilegios);

router.get('/ver_usuarios', sesionController.isLoggedIn, sesionController.gestionUsuario, usuarioController.getVerUsuarios);

router.get('/ver_perfil', sesionController.isLoggedIn, usuarioController.getVerPerfil);

router.post('/agregar_usuario', sesionController.isLoggedIn, sesionController.gestionUsuario, usuarioController.postAgregarUsuario)

router.post('/editar_privilegios/:rut_usuario', sesionController.isLoggedIn, sesionController.gestionPriv, usuarioController.postEditarPrivilegios);

router.post('/eliminar_usuario/:rut_usuario', sesionController.isLoggedIn, sesionController.gestionUsuario, usuarioController.postEliminarUsuario)

router.post('/editar_usuario/:rut_usuario', sesionController.isLoggedIn, sesionController.gestionUsuario, usuarioController.postEditarUsuario);

router.post('/editar_password/:rut_usuario', sesionController.isLoggedIn, usuarioController.postEditarPassword);

module.exports = router;