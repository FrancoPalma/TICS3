const express = require('express');
const { rotate } = require('pdfkit');
const router = express.Router();
const infanteController = require('../controllers/infanteController.js')

router.get('/ver_infantes', infanteController.getVerInfantes)

router.get('/ver_infante/:rut_infante', infanteController.getVerInfante)

router.post('/editar_infante/:infante', infanteController.postEditarInfante);

router.post('/agregar_infante', infanteController.postAgregarInfante);

router.post('/eliminar_infante/:rut_infante', infanteController.postEliminarInfante);

router.get('/ver_ficha', infanteController.getVerFicha);

router.post('/importar_ficha', infanteController.postImportarFicha);

router.get('/descargar_ficha', infanteController.getDescargarFicha);

module.exports = router;