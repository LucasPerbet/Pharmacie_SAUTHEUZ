/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur des patients . En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const express = require('express');
const modelPatient = require('../models/modelPatient');

const patientController = {

    /**
     * Fonction permettant d'afficher la liste des patients 
     * @param {*} req non utilisé
     * @param {*} res réponse des données lues avec getPatient()
     */

    async homePatient(req, res) {
        try {
            let data = await modelPatient.getPatient();
            if (data) {
                res.render('patientHome', { data: data });
            } else {
                res.render('patientHome', { data: {} });
            }
        } catch (error) {
            console.log(error);
        }

    },

    /**
 * Fonction permettant l'ajout d'un patient (méthode POST)
 * @param {*} req requete permettant de récupérer les données
 * @param {*} res réponse avec une redirection
 */

    async addPatient(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const patient = {
                num_secu_sociale: req.body.num_secu_sociale,
                nom_patient: req.body.nom_patient,
                prenom_patient: req.body.prenom_patient,
                date_naissance: req.body.date_naissance,
                id_mutuelle: req.body.id_mutuelle
            };
            if (patient.num_secu_sociale != "" & patient.nom_patient != "" & patient.prenom_patient != "" & patient.date_naissance != "") {
                // on transmet le nouvel utilisateur à la fonction 'addpatient' dans le modèle 
                let data = await modelPatient.addPatient(patient);
                if (data) {
                    res.redirect('/patient/home');
                }
                else {
                    console.log('error occured', err);
                }
            } else {
                // Message d'erreur
                console.log('Merci de renseigner toutes les zones');
                res.redirect('/patient/home');
            };
        }
        catch (error) {
            console.log('error', error);
        };
    },
    /**
     * Fonction qui supprime un patient (par son ID)
     * @param {*} req requete permettant de récupérer l'ID dans l'URL
     * @param {*} res redirige vers la page accueil patient
     */
    async deletePatient(req, res) {
        try {
            let data = modelPatient.deletePatient(req.params.id);
            if (data) {
                res.redirect('/patient/home');
                console.log("Patient supprimé !")
            }
        } catch (error) {
            console.log('error', error);
        }

    },

    /**
     * Fonction affichant le formulaire d'édition d'un profil (par son ID)
     * @param {*} req requete permettant de récupérer l'ID dans l'URL
     * @param {*} res réponse contenant le formulaire d'édition des données du médecin
     */

    async findPatient(req, res) {
        try {
            let id_patient = req.params.id;
            let data = await modelPatient.findPatient(id_patient);
    
            // Check if any results were found
            if (data.length > 0) {
                // Assuming you want to work with the first result (you may loop through all if needed)
                const patient = data[0];
                
                // Render the 'patientEdit' view with the patient data
                res.render('patientEdit', { id_patient: patient.id_patient, num_secu_sociale: patient.num_secu_sociale,
                                            nom_patient:patient.nom_patient, prenom_patient: patient.prenom_patient, 
                                            date_naissance: patient.date_naissance, id_mutuelle: patient.id_mutuelle});
            } else {
                // If no data is found, render 'patientEdit' with an empty data object
                res.render('patientEdit', { id_patient, data: {} });
            }
        } catch (error) {
            console.log('Error in patient edit route:', error);
            // You might want to handle the error more gracefully, e.g., redirect to an error page
            res.status(500).send('Internal Server Error');
        }
    },

        /**
     * Fonctionpermettant la modification d'un profil
     * @param {*} req requete permettant de récupérer les infos du patient
     * @param {*} res réponse contenant le formulaire d'édition des données du patient
     */
    async editPatient(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const patient = {
                id_patient : req.body.id_patient,
                num_secu_sociale: req.body.num_secu_sociale,
                nom_patient: req.body.nom_patient,
                prenom_patient: req.body.prenom_patient,
                date_naissance: req.body.date_naissance,
                id_mutuelle: req.body.id_mutuelle
            };

            
            let data = await modelPatient.editPatient(patient);
            if (data)  {
                res.redirect('/patient/home');
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}

module.exports = patientController;