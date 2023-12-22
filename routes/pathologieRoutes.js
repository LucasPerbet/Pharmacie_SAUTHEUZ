/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier ne contient que les sous-routes pour le chemin /pathologie/
*/

const express = require('express');
const controllerPathologie = require('../controllers/controllerPathologie');
const router = express.Router();

router.get('/home', controllerPathologie.homePathologie);
router.post('/add', controllerPathologie.addPathologie);
router.get('/edit/:id', controllerPathologie.findPathologie);
router.post('/edit', controllerPathologie.editPathologie);
router.get('/delete/:id', controllerPathologie.deletePathologie);

module.exports = router;
