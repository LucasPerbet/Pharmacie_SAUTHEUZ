/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /patient/
*/

const express =  require('express');
const controllerDefaut = require('../controllers/controllerDefaut');

// La variable contient l'instance du routeur
const router = express.Router();  

// Liste des routes utilisables pour Patient
router.get('/',controllerDefaut.Home);
router.get('*',controllerDefaut.Error)

module.exports = router;