// controllerPrescription.js

const express = require('express');
const modelPrescription = require('../models/modelPrescription');
const modelPatient = require('../models/modelPatient');
const modelMedicament = require('../models/modelMedicament');



function formatDate(dateString) {
    const date = new Date(dateString);
    const isoDate = date.toISOString().split('T')[0]; // Format AAAA-MM-JJ
    return isoDate;
  }
  
const prescriptionController = {
    async homePrescription(req, res) {
        try {
            // Récupérez la liste des prescriptions
            let prescriptions = await modelPrescription.getPrescription();

            if (prescriptions) {
                // Formatage de la date pour chaque prescription
                prescriptions = prescriptions.map(prescription => {
                    return {
                        ...prescription,
                        date_prescription: formatDate(prescription.date_prescription)
                    };
                });

                // Récupérez la liste des patients
                let patients = await modelPatient.getPatient();

                // Récupérez la liste des médicaments
                let medicaments = await modelMedicament.getMedicament();

                res.render('prescriptionHome', { prescriptions, patients, medicaments });
            } else {
                res.render('prescriptionHome', { prescriptions: [], patients: [], medicaments: [] });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server');
        }
    },

    async addPrescription(req, res) {
        try {
            const prescription = {
                id_patient: req.body.id_patient,
                id_medicament: req.body.id_medicament,
                date_prescription: req.body.date_prescription,
                posologie: req.body.posologie
            };

            if (prescription.id_patient && prescription.id_medicament && prescription.date_prescription && prescription.posologie) {
                let data = await modelPrescription.addPrescription(prescription);
                if (data) {
                    res.redirect('/prescription/home');
                } else {
                    console.log('Error occurred while adding prescription');
                    res.redirect('/prescription/home');
                }
            } else {
                console.log('Please provide all necessary information');
                res.redirect('/prescription/home');
            }
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    async findPrescription(req, res) {
        try {
            let prescriptionId = req.params.id;
            let prescriptionData = await modelPrescription.findPrescription(prescriptionId);
            // Récupérer les données des patients pour le menu déroulant
            let patientsData = await modelPatient.getPatient();
            // Récupérer les données des médicaments pour le menu déroulant
            let medicamentsData = await modelMedicament.getMedicament();
    
            if (prescriptionData.length > 0) {
                const prescription = prescriptionData[0];
                // Formater la date en utilisant la fonction formatDate
                const formattedDate = formatDate(prescription.date_prescription);
                // Rendre la vue 'prescriptionEdit' avec les données de la prescription, des patients et des médicaments
                res.render('prescriptionEdit', {
                    id_prescription: prescription.id_prescription,
                    id_patient: prescription.id_patient,
                    id_medicament: prescription.id_medicament,
                    date_prescription: formattedDate,
                    posologie: prescription.posologie,
                    // Transmettre les données des patients au modèle
                    patients: patientsData,
                    // Transmettre les données des médicaments au modèle
                    medicaments: medicamentsData,
                });
            } else {
                // S'il n'y a pas de données, rendre la vue 'prescriptionEdit' sans données
                res.render('prescriptionEdit', { id_prescription: prescriptionId, data: {}, patients: patientsData, medicaments: medicamentsData });
            }
        } catch (error) {
            console.log('Error on prescriptionEdit route:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    

    async deletePrescription(req, res) {
        try {
            let data = await modelPrescription.deletePrescription(req.params.id);
            if (data) {
                res.redirect('/prescription/home');
                console.log("Prescription deleted!");
            }
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    async editPrescription(req, res) {
        try {
            const prescription = {
                id_prescription: req.body.id_prescription,
                id_patient: req.body.id_patient,
                id_medicament: req.body.id_medicament,
                date_prescription: req.body.date_prescription,
                posologie: req.body.posologie
            };

            if (
                prescription.id_prescription &&
                prescription.id_patient &&
                prescription.id_medicament &&
                prescription.date_prescription &&
                prescription.posologie
            ) {
                let data = await modelPrescription.editPrescription(prescription);

                if (data) {
                    res.redirect('/prescription/home');
                } else {
                    console.log('Error occurred while editing prescription');
                    res.redirect('/prescription/home');
                }
            } else {
                console.log('Please provide all necessary information');
                res.redirect('/prescription/home');
            }
        } catch (error) {
            console.log('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }

};

module.exports = prescriptionController;
