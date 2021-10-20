const express = require('express');
const router = express.Router();
const infanteController = require('../controllers/infanteController.js')
const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(__dirname)
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

router.get('/ver_infante/:rut_infante', infanteController.getVerInfante)

router.post('/editar_infante/:infante', infanteController.postEditarInfante);

router.post('/agregar_infante', infanteController.postAgregarInfante);

router.post('/eliminar_infante/:rut_infante', infanteController.postEliminarInfante);

router.get('/ver_ficha', infanteController.getVerFicha);

router.post('/importar_ficha/:rut_infante', upload.single('ficha'), infanteController.postImportarFicha);

router.get('/descargar_ficha', infanteController.getDescargarFicha);

module.exports = router;