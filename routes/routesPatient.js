/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /patient/
*/

const express =  require('express');
const controller = require('../controllers/controllerPatient');

// La variable contient l'instance du routeur
const router = express.Router();  

// Liste des routes utilisables pour Patient
router.get('/home',controller.homePatient);
router.post('/add',controller.addPatient);
router.get('/edit/:id',controller.getPatient);
router.put('/edit/',controller.editPatient);
router.get('/delete/:id',controller.deletePatient);

module.exports = router;