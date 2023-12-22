/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur des médecins. En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const express = require('express');
const modelMedecin = require('../models/modelMedecin');

const medecinController = {

    /**
     * Fonction permettant d'afficher la liste des médecins
     * @param {*} req non utilisé
     * @param {*} res réponse des données lues avec getMedecin()
     */
    async homeMedecin(req, res) {
        try {
            // Récupérez la liste des médecins
            let medecins = await modelMedecin.getMedecin();

            if (medecins) {
                res.render('medecinHome', { medecins });
            } else {
                res.render('medecinHome', { medecins: [] });
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Fonction permettant l'ajout d'un médecin (méthode POST)
     * @param {*} req requête permettant de récupérer les données
     * @param {*} res réponse avec une redirection
     */
    async addMedecin(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const medecin = {
                nom_medecin: req.body.nom_medecin,
                prenom_medecin: req.body.prenom_medecin,
            };

            if (medecin.nom_medecin != "" && medecin.prenom_medecin != "") {
                // On transmet le nouveau médecin à la fonction 'addMedecin' dans le modèle 
                let data = await modelMedecin.addMedecin(medecin);
                if (data) {
                    res.redirect('/medecin/home');
                } else {
                    console.log('Error occurred', err);
                }
            } else {
                // Message d'erreur
                console.log('Merci de renseigner toutes les zones');
                res.redirect('/medecin/home');
            };
        } catch (error) {
            console.log('Error', error);
        };
    },

    /**
     * Fonction qui supprime un médecin (par son ID)
     * @param {*} req requête permettant de récupérer l'ID dans l'URL
     * @param {*} res redirige vers la page accueil médecin
     */
    async deleteMedecin(req, res) {
        try {
            let data = await modelMedecin.deleteMedecin(req.params.id);
            if (data) {
                res.redirect('/medecin/home');
                console.log("Médecin supprimé !");
            }
        } catch (error) {
            console.log('Error', error);
        }
    },

    /**
     * Fonction affichant le formulaire d'édition d'un médecin (par son ID)
     * @param {*} req requête permettant de récupérer l'ID dans l'URL
     * @param {*} res réponse contenant le formulaire d'édition des données du médecin
     */
    async findMedecin(req, res) {
        try {
            let id_medecin = req.params.id;
            let medecinData = await modelMedecin.findMedecin(id_medecin);

            if (medecinData.length > 0) {
                const medecin = medecinData[0];
                // Rendre la vue 'medecinEdit' avec les données du médecin
                res.render('medecinEdit', {
                    id_medecin: medecin.id_medecin,
                    nom_medecin: medecin.nom_medecin,
                    prenom_medecin: medecin.prenom_medecin,
                });
            } else {
                // S'il n'y a pas de données, rendre la vue 'medecinEdit' sans données
                res.render('medecinEdit', { id_medecin, data: {} });
            }
        } catch (error) {
            console.log('Erreur sur la route medecinEdit :', error);
            res.status(500).send('Erreur interne du serveur');
        }
    },

    /**
     * Fonction permettant la modification d'un médecin
     * @param {*} req requête permettant de récupérer les infos du médecin
     * @param {*} res réponse contenant le formulaire d'édition des données du médecin
     */
    async editMedecin(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const medecin = {
                id_medecin: req.body.id_medecin,
                nom_medecin: req.body.nom_medecin,
                prenom_medecin: req.body.prenom_medecin,
            };

            let data = await modelMedecin.editMedecin(medecin);
            if (data) {
                res.redirect('/medecin/home');
            }
        } catch (error) {
            console.log('Error', error);
        }
    }
}

module.exports = medecinController;
