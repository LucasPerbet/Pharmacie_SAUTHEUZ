/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur des patients . En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const express = require('express');
const modelPatient = require('../models/modelPatient');

const patientController = {

async homePatient(req,res){
    try {
        let data = await modelPatient.getPatient();
        if(data) {
            res.render('patientHome');
        }else {
            res.render('patientHome');
        }
    }catch (error){
        console.log(error);
    }
       
    }

}

module.exports = patientController;