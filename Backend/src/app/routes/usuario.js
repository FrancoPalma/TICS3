const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/usuarioController')
const sesionController = require('../../controllers/sesionController.js')

router.get('/ver_privilegios', usuarioController.getPrivilegios);

module.exports = router;