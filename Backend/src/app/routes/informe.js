const express = require('express');
const router = express.Router();
const pool = require('../../config/database.js');
const informeController = require('../../controllers/informeController.js')

router.get('/ver_informe', informeController.getInforme);

module.exports = router;
