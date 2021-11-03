const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController.js')

router.get('/visualizar_informe', informeController.getVisualizarInforme);

router.get('/crear_informe', informeController.postInforme);

router.get('/prueba', informeController.prueba);

router.post('/crear_metodologia/:id_informe', informeController.postMetodologia);

router.post('/crear_evaluacion/:id_informe', informeController.postEvaluacion);

router.post('/crear_objetivo/:id_informe', informeController.postObjetivo);

router.post('/crear_analisis/:id_informe', informeController.postAnalisis);

router.post('/crear_sesion/:id_informe', informeController.postSesion);

router.post('/crear_criterio/:id_informe', informeController.postCriterio);

router.post('/crear_actividad/:id_informe', informeController.postActividad);

router.post('/editar_informe/:id_informe', informeController.postEditarInforme)

router.post('/eliminar_informe', informeController.postEliminarInforme);

router.get('/eliminar_informe', informeController.getEliminarInforme);

router.get('/ver_informe/:id_informe', informeController.getVerInforme);

router.get('/ver_metodologia/:id_informe', informeController.getVerMetodologia);

router.get('/ver_sesion/:id_informe', informeController.getVerSesion);

router.get('/ver_evaluacion/:id_informe', informeController.getVerEvaluacion);

router.get('/ver_criterio/:id_informe', informeController.getVerCriterio);

router.get('/ver_objetivo/:id_informe', informeController.getVerObjetivo);

router.get('/ver_actividad/:id_informe', informeController.getVerActividad);

router.get('/ver_analisis/:id_informe', informeController.getVerAnalisis);

module.exports = router;