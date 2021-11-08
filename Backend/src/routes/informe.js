const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js');
const sesionController = require('../controllers/sesionController.js');

router.post('/guardar_informe', sesionController.isLoggedIn, sesionController.gestionEvaluacion, informeController.postGuardarInforme);

router.post('/ver_informe', informeController.postVerInforme);

router.post('/eliminar_informe', sesionController.isLoggedIn, sesionController.gestionEvaluacion, informeController.postEliminarInforme);

router.post('/editar_informe', sesionController.isLoggedIn, sesionController.gestionEvaluacion, informeController.postEditarInforme);

module.exports = router;