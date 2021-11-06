const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js')

router.post('/guardar_informe', informeController.postGuardarInforme);

router.post('/ver_informe', informeController.postVerInforme);

module.exports = router;