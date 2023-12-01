/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /patient/
*/

const express = require('express');
const controllerPatient = require('../controllers/controllerPatient');
const router = express.Router();

router.get('/home', controllerPatient.homePatient);
router.post('/add', controllerPatient.addPatient);
router.get('/edit/:id',controllerPatient.findPatient)
router.post('/edit/',controllerPatient.editPatient)
router.get('/delete/:id',controllerPatient.deletePatient) 

module.exports = router;