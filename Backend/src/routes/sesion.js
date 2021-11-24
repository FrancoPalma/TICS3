const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const sesionController = require('../controllers/sesionController')

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', sesionController.postLogin);

router.post('/agregar_usuario', sesionController.isLoggedIn, sesionController.gestionUsuario, sesionController.postSignup)

router.post('/agregar_usuario_admin', sesionController.postSignupAdmin)

router.get('/logout', sesionController.isLoggedIn, sesionController.getLogout);

module.exports = router;
