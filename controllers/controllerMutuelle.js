/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur des mutuelles . En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const express = require('express');
const modelMutuelle = require('../models/modelMutuelle');

const mutuelleController = {
    async homeMutuelle(req, res) {
        try {
            let data = await modelMutuelle.getMutuelle();
            if (data) {
                res.render('mutuelleHome', { data: data });
            } else {
                res.render('mutuelleHome', { data: {} });
            }
        } catch (error) {
            console.log(error);
        }
    },

    async addMutuelle(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const mutuelle = {
                nom_mutuelle: req.body.nom_mutuelle,
                tel_mutuelle: req.body.tel_mutuelle,
                mail_mutuelle: req.body.mail_mutuelle,
            };

            if (mutuelle.nom_mutuelle != "" & mutuelle.tel_mutuelle != "" & mutuelle.mail_mutuelle != "") {
                // on transmet le nouvel utilisateur à la fonction 'addmutuelle' dans le modèle 
                let data = await modelMutuelle.addMutuelle(mutuelle);
                if (data) {
                    res.redirect('/mutuelle/home');
                }
                else {
                    console.log('error occured', err);
                }
            } else {
                // Message d'erreur
                console.log('Merci de renseigner toutes les zones');
                res.redirect('/mutuelle/home');
            };
        }
        catch (error) {
            console.log('error', error);
        };
    },

    /**
     * Fonction affichant le formulaire d'édition d'un profil (par son ID)
     * @param {*} req requete permettant de récupérer l'ID dans l'URL
     * @param {*} res réponse contenant le formulaire d'édition des données du médecin
     */

    async findMutuelle(req, res) {
        try {
            let id_mutuelle = req.params.id;
            let data = await modelMutuelle.findMutuelle(id_mutuelle);
    
            // Check if any results were found
            if (data.length > 0) {
                // Assuming you want to work with the first result (you may loop through all if needed)
                const mutuelle = data[0];
                
                // Render the 'mutuelleEdit' view with the mutuelle data
                res.render('mutuelleEdit', { id_mutuelle: mutuelle.id_mutuelle, nom_mutuelle:mutuelle.nom_mutuelle, 
                                            tel_mutuelle: mutuelle.tel_mutuelle, mail_mutuelle: mutuelle.mail_mutuelle});
            } else {
                // If no data is found, render 'mutuelleEdit' with an empty data object
                res.render('mutuelleEdit', { id_mutuelle, data: {} });
            }
        } catch (error) {
            console.log('Error in mutuelle edit route:', error);
            // You might want to handle the error more gracefully, e.g., redirect to an error page
            res.status(500).send('Internal Server Error');
        }
    },

        /**
     * Fonction qui supprime un Mutuelle (par son ID)
     * @param {*} req requete permettant de récupérer l'ID dans l'URL
     * @param {*} res redirige vers la page accueil Mutuelle
     */
        async deleteMutuelle(req, res) {
            try {
                let data = modelMutuelle.deleteMutuelle(req.params.id);
                if (data) {
                    res.redirect('/mutuelle/home');
                    console.log("Mutuelle supprimé !")
                }
            } catch (error) {
                console.log('error', error);
            }
    
        },

            /**
     * Fonctionpermettant la modification d'un profil
     * @param {*} req requete permettant de récupérer les infos du mutuelle
     * @param {*} res réponse contenant le formulaire d'édition des données du mutuelle
     */
    async editMutuelle(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const mutuelle = {
                id_mutuelle : req.body.id_mutuelle,
                nom_mutuelle: req.body.nom_mutuelle,
                tel_mutuelle: req.body.tel_mutuelle,
                mail_mutuelle: req.body.mail_mutuelle
            };

            
            let data = await modelMutuelle.editMutuelle(mutuelle);
            if (data)  {
                res.redirect('/mutuelle/home');
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}

module.exports = mutuelleController;