/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des patients
*/
// Module mysql2 pour utilisation du pool
const mysql = require('mysql2');
// Récupération du pool dans le fichier de connexion
const pool = require('../public/config/DBconnect');

/**
 * @description SELECT: Liste de tous les patients
 * @returns {Array} Une liste de patients
 */
async function getPatient() {
    try {
        // On récupère la liste des patients avec les dates formatées
        const [rows, fields] = await pool.query("SELECT patient.id_patient, patient.num_secu_sociale, patient.nom_patient, patient.prenom_patient, patient.date_naissance, patient.id_mutuelle, mutuelle.nom_mutuelle FROM patient JOIN mutuelle ON patient.id_mutuelle = mutuelle.id_mutuelle;");
        // On retourne les données pour les utiliser dans le contrôleur
        return rows;
    } catch (err) {
        console.error("Error fetching data from the database:", err);
        throw err;
    }
}

/**
 * @description INSERT INTO: l'ajout d'un nouveau patient
 * @param {Objet} patient correspond à toutes les informations d'un nouveau patient
 * @returns {Objet} Retourne les informations du patient ou une erreur
 */
async function addPatient(patient) {
    try {
        // Requete SQL pour ajouter un nouveau patient
        const sql = `
            INSERT INTO patient (num_secu_sociale, nom_patient, prenom_patient, date_naissance, id_mutuelle)
            VALUES (?, ?, ?, ?, ?)
        `;

        // On execute la requete avec le tableau transmis en parametre
        const result = await pool.query(sql, [
            patient.num_secu_sociale,
            patient.nom_patient,
            patient.prenom_patient,
            patient.date_naissance,
            patient.id_mutuelle
        ]);

        // Retour du resultat
        return result;
    } catch (error) {
        // Gestion des erreurs
        console.error('Error adding patient:', error);
        throw error;
    }
}

/**
 * @description SELECT : la recherche d'un patient en fonction de son ID
 * @param {*} patient correspond à l'id du patient à rechercher
 * @returns {Objet} Retourne les informations du patient pour utilisation ou une erreur
 */

async function findPatient(patient) {

    try {
        const sql = "SELECT id_patient, num_secu_sociale, nom_patient, prenom_patient, date_naissance, id_mutuelle FROM `patient` WHERE id_patient = ?";

        const [rows, fields] = await pool.query(sql, [patient]);
        
        return rows;
    } catch (error) {
        console.error('Error finding patient:', error);
        throw error;
    }
}

/**
 * @description DELETE : la recherche et l'effacement existent dans une seule fonction
 * @param {*} patient correspond à l'id du patient à supprimer 
 * @returns {id} Retourne l'ID du patient supprimé ou une erreur
 */

async function deletePatient(patient) {
    console.log(patient);
    try {
        pool.query("DELETE FROM patient WHERE id_patient = ?", patient)
        return patient;

    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
}

/**
 * @description UPDATE : la modification du patient dans la base de données
 * @param {*} patient correspond à l'id du patient à modifier
 * @returns {Objet} Retourne les infos du patient après modification ou une erreur
 */
async function editPatient(patient) {

    try {

        const { num_secu_sociale, nom_patient, prenom_patient, date_naissance, id_mutuelle, id_patient } = patient
        // Requete SQL pour mettre à jour un patient
        const sql = `
            UPDATE patient
            SET num_secu_sociale = ?, nom_patient = ?, prenom_patient = ?, date_naissance = ?, id_mutuelle = ?
            WHERE id_patient = ?`;

        // On execute la requete avec le tableau transmis en parametre
        await pool.query(sql, [
            patient.num_secu_sociale,
            patient.nom_patient,
            patient.prenom_patient,
            patient.date_naissance,
            patient.id_mutuelle,
            patient.id_patient 
        ]);

        return patient;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
}

// Exports des différentes fonctions
module.exports = {
    getPatient,
    addPatient,
    deletePatient,
    findPatient,
    editPatient
};
