const express = require('express');
const router = express.Router();
const infanteController = require('../controllers/infanteController.js')

router.get('/ver_infantes', infanteController.getVerInfantes)