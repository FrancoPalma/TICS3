const express = require('express');
const router = express.Router();
const infanteController = require('../controllers/infanteController.js');
const sesionController = require('../controllers/sesionController.js');
const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/fichas'));
    },
    filename: (req, file, cb) => {
        let nombre = req.params.rut_infante
        cb(null, 'ficha'+nombre+'.pdf')
    }
})

const filter = function (req, file, cb) {
    if (path.extname(file.originalname) !== '.pdf') {
      return cb(new Error('Solo se permite PDF'))
    }
    cb(null, true)
}

const upload = multer({
    fileFilter: filter,
    storage: fileStorage})

router.get('/ver_infantes', infanteController.getVerInfantes)

router.post('/ver_infante/:rut_infante', infanteController.postVerInfante)

router.post('/editar_infante/:rut_infante', sesionController.isLoggedIn, sesionController.gestionInfante, infanteController.postEditarInfante);

router.post('/agregar_infante', sesionController.isLoggedIn, sesionController.gestionInfante, infanteController.postAgregarInfante);

router.post('/eliminar_infante/:rut_infante', sesionController.isLoggedIn, sesionController.gestionInfante, infanteController.postEliminarInfante);

//router.get('/ver_ficha', infanteController.getVerFicha);

router.post('/importar_ficha/:rut_infante', sesionController.isLoggedIn, sesionController.gestionFicha, infanteController.postImportarFicha);

router.post('/ver_ficha/:rut_infante', infanteController.postVerFicha);

router.post('/ver_informes/:rut_infante', sesionController.isLoggedIn,  infanteController.postVerInformes);

module.exports = router;