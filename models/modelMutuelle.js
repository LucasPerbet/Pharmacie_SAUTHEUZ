/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des mutuelles
*/
// Module mysql2 pour utilisation du pool
const mysql = require('mysql2');
// Récupération du pool dans le fichier de connexion
const pool = require('../public/config/DBconnect');

async function getMutuelle() {
    try {
        // On récupère la liste des Mutuelles avec les dates formatées
        const [rows, fields] = await pool.query("SELECT id_mutuelle, nom_mutuelle, tel_mutuelle, mail_mutuelle FROM `mutuelle`");
        // On retourne les données pour les utiliser dans le contrôleur
        return rows;
    } catch (err) {
        console.error("Error fetching data from the database:", err);
        throw err;
    }
}

/**
 * @description INSERT INTO: l'ajout d'une nouvelle mutuelle
 * @param {Objet} mutuelle correspond à toutes les informations d'une nouvelle mutuelle
 * @returns {Objet} Retourne les informations d'une mutuelle ou une erreur
 */
async function addMutuelle(mutuelle) {
    try {
        // Requete SQL pour ajouter une nouvelle mutuelle
        const sql = `
            INSERT INTO mutuelle (nom_mutuelle, tel_mutuelle, mail_mutuelle)
            VALUES (?, ?, ?)
        `;

        // On execute la requete avec le tableau transmis en parametre
        const result = await pool.query(sql, [
            mutuelle.nom_mutuelle,
            mutuelle.tel_mutuelle,
            mutuelle.mail_mutuelle
        ]);

        // Retour du resultat
        return result;
    } catch (error) {
        // Gestion des erreurs
        console.error('Error adding mutuelle:', error);
        throw error;
    }
}

/**
 * @description SELECT : la recherche d'un mutuelle en fonction de son ID
 * @param {*} idMutuelle correspond à l'id du mutuelle à rechercher
 * @returns {Objet} Retourne les informations du mutuelle pour utilisation ou une erreur
 */

async function findMutuelle(idMutuelle) {

    try {
        const sql = "SELECT id_mutuelle, nom_mutuelle, tel_mutuelle, mail_mutuelle FROM `mutuelle` WHERE id_mutuelle = ?";

        const [rows, fields] = await pool.query(sql, [idMutuelle]);
        
        return rows;
    } catch (error) {
        console.error('Error finding mutuelle:', error);
        throw error;
    }
}

/**
 * @description DELETE : la recherche et l'effacement existent dans une seule fonction
 * @param {*} mutuelle correspond à l'id du mutuelle à supprimer 
 * @returns {id} Retourne l'ID du mutuelle supprimé ou une erreur
 */

async function deleteMutuelle(mutuelle) {
    console.log(mutuelle);
    try {
        pool.query("DELETE FROM mutuelle WHERE id_mutuelle = ?", mutuelle)
        return mutuelle;

    } catch (error) {
        console.error('Error deleting mutuelle:', error);
        throw error;
    }
}

/**
 * @description UPDATE : la modification du mutuelle dans la base de données
 * @param {*} mutuelle correspond à l'id du mutuelle à modifier
 * @returns {Objet} Retourne les infos du mutuelle après modification ou une erreur
 */
async function editMutuelle(mutuelle) {

    try {

        const { id_mutuelle, nom_mutuelle, tel_mutuelle, mail_mutuelle } = mutuelle
        // Requete SQL pour mettre à jour un mutuelle
        const sql = `
            UPDATE mutuelle
            SET nom_mutuelle = ?, tel_mutuelle = ?, mail_mutuelle = ?
            WHERE id_mutuelle = ?`;

        // On execute la requete avec le tableau transmis en parametre
        await pool.query(sql, [
            mutuelle.nom_mutuelle,
            mutuelle.tel_mutuelle,
            mutuelle.mail_mutuelle,
            mutuelle.id_mutuelle 
        ]);

        return mutuelle;
    } catch (error) {
        console.error('Error updating mutuelle:', error);
        throw error;
    }
}

module.exports = {
 getMutuelle,
 addMutuelle,
 findMutuelle,
 deleteMutuelle,
 editMutuelle,
};