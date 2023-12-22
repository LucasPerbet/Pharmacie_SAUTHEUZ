// prescriptionRoutes.js

const express = require('express');
const controllerPrescription = require('../controllers/controllerPrescription');
const router = express.Router();

router.get('/home', controllerPrescription.homePrescription);
router.post('/add', controllerPrescription.addPrescription);
router.get('/edit/:id', controllerPrescription.findPrescription);
router.post('/edit', controllerPrescription.editPrescription);
router.get('/delete/:id', controllerPrescription.deletePrescription);

module.exports = router;
