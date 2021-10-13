const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js')
const sesionController = require('../controllers/sesionController.js')

router.get('/ver_informe', sesionController.isLoggedIn, informeController.getInforme);

router.get('/ver_informe_prueba', informeController.getInformePrueba);

router.get('/crear_informe', informeController.postInforme);

module.exports = router;
