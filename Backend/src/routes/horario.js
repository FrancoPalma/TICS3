const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController')
const sesionController = require('../controllers/sesionController.js')

router.post('/anadir_horario', sesionController.isLoggedIn, sesionController.gestionUsuario, horarioController.postAnadirHorario);

router.post('/ver_horario', sesionController.isLoggedIn, horarioController.postVerHorario);

router.post('/ver_horario_admin', sesionController.isLoggedIn, sesionController.gestionUsuario, horarioController.postVerHorarioAdmin);

router.post('/eliminar_horario', sesionController.isLoggedIn, sesionController.gestionUsuario, horarioController.postEliminarHorario);

module.exports = router;