const express = require('express');
const router = express.Router();
const fichaController = require('../controllers/fichaController.js')

router.get('/ver_ficha', infanteController.getVerFicha);

router.post('/importar_ficha', informeController.postImportarFicha)
