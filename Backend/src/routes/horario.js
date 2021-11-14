const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController')
const sesionController = require('../controllers/sesionController.js')

router.post('/anadir_horario', horarioController.postAnadirHorario);

router.post('/ver_horario', horarioController.postVerHorario);

router.post('/eliminar_horario', horarioController.postEliminarHorario);

module.exports = router;