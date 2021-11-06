const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js')

router.post('/guardar_informe', informeController.postGuardarInforme);

router.get('/ver_informe', informeController.getVerInforme);

module.exports = router;