/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur des médicaments. En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const express = require('express');
const modelMedicament = require('../models/modelMedicament');

const medicamentController = {
    async homeMedicament(req, res) {
        try {
            let data = await modelMedicament.getMedicament();
            if (data) {
                res.render('medicamentHome', { data: data });
            } else {
                res.render('medicamentHome', { data: {} });
            }
        } catch (error) {
            console.log(error);
        }
    },

    async addMedicament(req, res) {
        try {
            const medicament = {
                nom_medicament: req.body.nom_medicament,
                qte_en_stock: req.body.qte_en_stock,
                format_medicament: req.body.format_medicament,
                prix_medicament: req.body.prix_medicament,
            };

            if (medicament.nom_medicament != "" && medicament.qte_en_stock != "" && medicament.format_medicament != "" && medicament.prix_medicament != "") {
                let data = await modelMedicament.addMedicament(medicament);
                if (data) {
                    res.redirect('/medicament/home');
                } else {
                    console.log('Erreur lors de l\'ajout du médicament', err);
                }
            } else {
                console.log('Merci de renseigner toutes les zones');
                res.redirect('/medicament/home');
            }
        } catch (error) {
            console.log('Erreur lors de l\'ajout du médicament', error);
        }
    },

    async findMedicament(req, res) {
        try {
            let id_medicament = req.params.id;
            let data = await modelMedicament.findMedicament(id_medicament);

            if (data.length > 0) {
                const medicament = data[0];
                res.render('medicamentEdit', {
                    id_medicament: medicament.id_medicament,
                    nom_medicament: medicament.nom_medicament,
                    qte_en_stock: medicament.qte_en_stock,
                    format_medicament: medicament.format_medicament,
                    prix_medicament: medicament.prix_medicament
                });
            } else {
                res.render('medicamentEdit', { id_medicament, data: {} });
            }
        } catch (error) {
            console.log('Erreur sur la route medicamentEdit :', error);
            res.status(500).send('Erreur interne du serveur');
        }
    },

    async deleteMedicament(req, res) {
        try {
            let data = await modelMedicament.deleteMedicament(req.params.id);
            if (data) {
                res.redirect('/medicament/home');
                console.log("Médicament supprimé !");
            }
        } catch (error) {
            console.log('Erreur lors de la suppression du médicament', error);
        }
    },

    async editMedicament(req, res) {
        try {
            const medicament = {
                id_medicament: req.body.id_medicament,
                nom_medicament: req.body.nom_medicament,
                qte_en_stock: req.body.qte_en_stock,
                format_medicament: req.body.format_medicament,
                prix_medicament: req.body.prix_medicament
            };

            let data = await modelMedicament.editMedicament(medicament);
            if (data) {
                res.redirect('/medicament/home');
            }
        } catch (error) {
            console.log('Erreur lors de la modification du médicament', error);
        }
    }
}

module.exports = medicamentController;
