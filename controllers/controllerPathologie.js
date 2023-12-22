const express = require('express');
const modelPathologie = require('../models/modelPathologie');

const pathologieController = {
    async homePathologie(req, res) {
        try {
            // Récupérez la liste des pathologies
            let pathologies = await modelPathologie.getPathologie();

            if (pathologies) {
                res.render('pathologieHome', { pathologies });
            } else {
                res.render('pathologieHome', { pathologies: [] });
            }
        } catch (error) {
            console.log(error);
        }
    },

    async addPathologie(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const pathologie = {
                nom_pathologie: req.body.nom_pathologie
            };

            if (pathologie.nom_pathologie !== "") {
                // On transmet la nouvelle pathologie à la fonction 'addPathologie' dans le modèle 
                let data = await modelPathologie.addPathologie(pathologie);

                if (data) {
                    res.redirect('/pathologie/home');
                } else {
                    console.log('Error occurred', err);
                }
            } else {
                // Message d'erreur
                console.log('Merci de renseigner le nom de la pathologie');
                res.redirect('/pathologie/home');
            }
        } catch (error) {
            console.log('Error', error);
        }
    },

    async deletePathologie(req, res) {
        try {
            let data = await modelPathologie.deletePathologie(req.params.id);

            if (data) {
                res.redirect('/pathologie/home');
                console.log("Pathologie supprimée !");
            }
        } catch (error) {
            console.log('Error', error);
        }
    },

    async findPathologie(req, res) {
        try {
            let id_pathologie = req.params.id;
            let pathologieData = await modelPathologie.findPathologie(id_pathologie);

            if (pathologieData.length > 0) {
                const pathologie = pathologieData[0];
                res.render('pathologieEdit', {
                    id_pathologie: pathologie.id_pathologie,
                    nom_pathologie: pathologie.nom_pathologie
                });
            } else {
                res.render('pathologieEdit', { id_pathologie, data: {} });
            }
        } catch (error) {
            console.log('Error on pathologieEdit route:', error);
            res.status(500).send('Erreur interne du serveur');
        }
    },

    async editPathologie(req, res) {
        try {
            // Les données sont récupérées dans le corps de la requête
            const pathologie = {
                id_pathologie: req.body.id_pathologie,
                nom_pathologie: req.body.nom_pathologie
            };

            let data = await modelPathologie.editPathologie(pathologie);

            if (data) {
                res.redirect('/pathologie/home');
            }
        } catch (error) {
            console.log('Error', error);
        }
    }
};

module.exports = pathologieController;
