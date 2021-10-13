const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js')
const sesionController = require('../controllers/sesionController.js')

router.get('/ver_informe/:id', sesionController.isLoggedIn, informeController.getInforme);

router.get('/ver_informe_prueba', informeController.getInformePrueba);

router.post('/crear_informe', sesionController.isLoggedIn, informeController.postInforme);

module.exports = router;
