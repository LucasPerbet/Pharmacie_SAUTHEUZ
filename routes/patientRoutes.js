/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /patient/
*/

const express = require('express');
const controllerPatient = require('../controllers/controllerPatient')
const router = express.Router();

router.get('/home', controllerPatient.homePatient)

module.exports = router;