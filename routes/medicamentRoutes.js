/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /stocks/
*/

const express = require('express');
const controllerMedicaments = require('../controllers/controllerMedicament');
const router = express.Router();

router.get('/home', controllerMedicaments.homeMedicament);
router.post('/add', controllerMedicaments.addMedicament);
router.get('/edit/:id',controllerMedicaments.findMedicament)
router.post('/edit/',controllerMedicaments.editMedicament)
router.get('/delete/:id',controllerMedicaments.deleteMedicament) 

module.exports = router;