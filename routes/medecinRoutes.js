/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /medecin/
*/

const express = require('express');
const controllerMedecin = require('../controllers/controllerMedecin');
const router = express.Router();

router.get('/home', controllerMedecin.homeMedecin);
router.post('/add', controllerMedecin.addMedecin);
router.get('/edit/:id',controllerMedecin.findMedecin)
router.post('/edit/',controllerMedecin.editMedecin)
router.get('/delete/:id',controllerMedecin.deleteMedecin) 

module.exports = router;