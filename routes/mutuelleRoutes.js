/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /mutuelle/
*/

const express = require('express');
const controllerMutuelle = require('../controllers/controllerMutuelle');
const router = express.Router();

router.get('/home', controllerMutuelle.homeMutuelle);
router.post('/add', controllerMutuelle.addMutuelle);
router.get('/edit/:id',controllerMutuelle.findMutuelle);
router.post('/edit/',controllerMutuelle.editMutuelle);
router.get('/delete/:id',controllerMutuelle.deleteMutuelle);

module.exports = router;