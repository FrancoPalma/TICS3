const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js')

router.get('/ver_informe', informeController.getInforme);

router.get('/ver_informe_prueba', informeController.getInformePrueba);

router.get('/crear_informe', informeController.postInforme);

router.get('/prueba', informeController.prueba);

router.post('/crear_metodologia/:id_informe', informeController.postMetodologia);

router.post('/crear_evaluacion/:id_informe', informeController.postEvaluacion);

router.post('/crear_objetivo/:id_informe', informeController.postObjetivo);

router.post('/crear_analisis/:id_informe', informeController.postAnalisis);

router.post('/crear_sesion/:id_informe', informeController.postSesion);

router.post('/crear_criterio/:id_informe', informeController.postCriterio);

router.post('/crear_actividad/:id_informe', informeController.postActividad);

router.post('/eliminar_informe', informeController.postEliminarInforme);

router.get('/eliminar_informe', informeController.getEliminarInforme);

module.exports = router;
