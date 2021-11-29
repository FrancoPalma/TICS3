const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController')
const sesionController = require('../controllers/sesionController.js')

router.post('/anadir_horario', sesionController.isLoggedIn, sesionController.gestionHorario, horarioController.postAnadirHorario);

router.post('/ver_horario', sesionController.isLoggedIn, horarioController.postVerHorario);

router.post('/ver_horario_admin', horarioController.postVerHorarioAdmin);

router.post('/eliminar_horario', sesionController.isLoggedIn, sesionController.gestionHorario, horarioController.postEliminarHorario);

module.exports = router;