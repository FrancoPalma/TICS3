const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const sesionController = require('../controllers/sesionController')

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', sesionController.getLogin);

router.post('/login', sesionController.postLogin);

router.get('/signup', sesionController.getSignup);

router.post('/agregar_usuario', sesionController.postSignup)

router.get('/logout', sesionController.getLogout);

module.exports = router;
