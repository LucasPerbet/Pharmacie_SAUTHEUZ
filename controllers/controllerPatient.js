/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur de la partie Patient. En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

// Association du modèle
const modelPatient = require('../models/modelPatient');

const controllerPatient = {
    async homePatient(req, res) {
        try {
            const patients = await modelPatient.getPatients();
            res.json({ patients });
        } catch (error) {
            console.error('Erreur lors de la récupération des patients :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des patients.' });
        }
    },

    async addPatient(req, res) {
        try {
            const newPatient = req.body;
            const result = await modelPatient.addPatient(newPatient);
            res.json({ result });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du patient :', error);
            res.status(500).json({ error: 'Erreur lors de l\'ajout du patient.' });
        }
    },

    async editPatient(req, res) {
        try {
            const updatedPatient = req.body;
            const result = await modelPatient.editPatient(updatedPatient);
            res.json({ result });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du patient :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du patient.' });
        }
    },

    async deletePatient(req, res) {
        try {
            const patientID = req.params.id;
            const result = await modelPatient.deletePatient(patientID);
            res.json({ result });
        } catch (error) {
            console.error('Erreur lors de la suppression du patient :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression du patient.' });
        }
    },

    async getPatient(req, res) {
        try {
            const patientID = req.params.id;
            const patient = await modelPatient.findPatient(patientID);
            res.json({ patient });
        } catch (error) {
            console.error('Erreur lors de la récupération du patient :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération du patient.' });
        }
    },
};

module.exports = controllerPatient;

