const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js');
const sesionController = require('../controllers/sesionController.js');

router.post('/guardar_informe', informeController.postGuardarInforme);

router.post('/ver_informe', informeController.postVerInforme);

router.post('/eliminar_informe', informeController.postEliminarInforme);

router.post('/editar_informe', informeController.postEditarInforme);

module.exports = router;