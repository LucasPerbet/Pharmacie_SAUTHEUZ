/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur des patients . En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const express = require('express');

const patientController = {

    homePatient(req,res){
        res.render('patientHome')
    }
  
}

module.exports = patientController;