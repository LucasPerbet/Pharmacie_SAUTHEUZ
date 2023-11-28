/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /patient/
*/

const express =  require('express');
const controller = require('../controllers/controller');

// La variable contient l'instance du routeur
const router = express.Router();  

// Liste des routes utilisables pour Patient
router.get('/',controller.Home);
router.get('*',controller.Error);

module.exports = router;