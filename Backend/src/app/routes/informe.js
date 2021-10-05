const express = require('express');
const router = express.Router();
const pool = require('../../config/database.js');
const informeController = require('../../controllers/informeController.js')
const sesionController = require('../../controllers/sesionController.js')

router.get('/ver_informe/:id', sesionController.isLoggedIn, informeController.getInforme);

router.post('/crear_informe', sesionController.isLoggedIn, informeController.postInforme);

module.exports = router;
