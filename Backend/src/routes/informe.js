const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js')

router.get('/ver_informe', informeController.getInforme);

router.get('/ver_informe_prueba', informeController.getInformePrueba);

router.get('/crear_informe', informeController.postInforme);

router.get('/prueba', informeController.prueba);

router.post('/crear_metodologia', informeController.postMetodologia);

router.post('/crear_evaluacion', informeController.postEvaluacion);

router.post('/crear_objetivo', informeController.postObjetivo);

router.post('/crear_analisis', informeController.postAnalisis);

router.post('/crear_sesion', informeController.postSesion);

router.post('/crear_criterio', informeController.postCriterio);

router.post('/crear_actividad', informeController.postActividad);

module.exports = router;
