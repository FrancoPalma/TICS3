const express = require('express');
const router = express.Router();
const infanteController = require('../controllers/infanteController.js');
const sesionController = require('../controllers/sesionController.js');

router.get('/ver_infantes', sesionController.isLoggedIn, infanteController.getVerInfantes)

router.post('/ver_infante/:rut_infante', sesionController.isLoggedIn, infanteController.postVerInfante)

router.post('/editar_infante/:rut_infante', sesionController.isLoggedIn, sesionController.gestionInfante, infanteController.postEditarInfante);

router.post('/agregar_infante', sesionController.isLoggedIn, sesionController.gestionInfante, infanteController.postAgregarInfante);

router.post('/eliminar_infante/:rut_infante', sesionController.isLoggedIn, sesionController.gestionInfante, infanteController.postEliminarInfante);

router.post('/importar_ficha/:rut_infante', sesionController.isLoggedIn, sesionController.gestionFicha, infanteController.postImportarFicha);

router.post('/ver_ficha/:rut_infante', sesionController.isLoggedIn, infanteController.postVerFicha);

router.post('/ver_informes/:rut_infante', sesionController.isLoggedIn,  infanteController.postVerInformes);

module.exports = router;