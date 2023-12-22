/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des médecins
*/
// Module mysql2 pour utilisation du pool
const mysql = require('mysql2');
// Récupération du pool dans le fichier de connexion
const pool = require('../public/config/DBconnect');

/**
 * @description SELECT: Liste de tous les médecins
 * @returns {Array} Une liste de médecins
 */
async function getMedecin() {
    try {
        // On récupère la liste des médecins
        const [rows, fields] = await pool.query("SELECT id_medecin, nom_medecin, prenom_medecin FROM medecin;");
        // On retourne les données pour les utiliser dans le contrôleur
        return rows;
    } catch (err) {
        console.error("Error fetching data from the database:", err);
        throw err;
    }
}

/**
 * @description INSERT INTO: l'ajout d'un nouveau médecin
 * @param {Objet} medecin correspond à toutes les informations d'un nouveau médecin
 * @returns {Objet} Retourne les informations du médecin ou une erreur
 */
async function addMedecin(medecin) {
    try {
        // Requete SQL pour ajouter un nouveau médecin
        const sql = `
            INSERT INTO medecin (nom_medecin, prenom_medecin)
            VALUES (?, ?)
        `;

        // On execute la requete avec le tableau transmis en parametre
        const result = await pool.query(sql, [
            medecin.nom_medecin,
            medecin.prenom_medecin
        ]);

        // Retour du resultat
        return result;
    } catch (error) {
        // Gestion des erreurs
        console.error('Error adding medecin:', error);
        throw error;
    }
}

/**
 * @description SELECT : la recherche d'un médecin en fonction de son ID
 * @param {*} medecin correspond à l'id du médecin à rechercher
 * @returns {Objet} Retourne les informations du médecin pour utilisation ou une erreur
 */
async function findMedecin(medecin) {
    try {
        const sql = "SELECT id_medecin, nom_medecin, prenom_medecin FROM `medecin` WHERE id_medecin = ?";

        const [rows, fields] = await pool.query(sql, [medecin]);
        
        return rows;
    } catch (error) {
        console.error('Error finding medecin:', error);
        throw error;
    }
}

/**
 * @description DELETE : la recherche et l'effacement existent dans une seule fonction
 * @param {*} medecin correspond à l'id du médecin à supprimer 
 * @returns {id} Retourne l'ID du médecin supprimé ou une erreur
 */
async function deleteMedecin(medecin) {
    console.log(medecin);
    try {
        await pool.query("DELETE FROM medecin WHERE id_medecin = ?", medecin)
        return medecin;

    } catch (error) {
        console.error('Error deleting medecin:', error);
        throw error;
    }
}

/**
 * @description UPDATE : la modification du médecin dans la base de données
 * @param {*} medecin correspond à l'id du médecin à modifier
 * @returns {Objet} Retourne les infos du médecin après modification ou une erreur
 */
async function editMedecin(medecin) {
    try {
        const { nom_medecin, prenom_medecin, id_medecin } = medecin;
        // Requete SQL pour mettre à jour un médecin
        const sql = `
            UPDATE medecin
            SET nom_medecin = ?, prenom_medecin = ?
            WHERE id_medecin = ?`;

        // On execute la requete avec le tableau transmis en parametre
        await pool.query(sql, [
            medecin.nom_medecin,
            medecin.prenom_medecin,
            medecin.id_medecin
        ]);

        return medecin;
    } catch (error) {
        console.error('Error updating medecin:', error);
        throw error;
    }
}

// Exports des différentes fonctions
module.exports = {
    getMedecin,
    addMedecin,
    deleteMedecin,
    findMedecin,
    editMedecin
};
