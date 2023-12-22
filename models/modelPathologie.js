// Module mysql2 pour utilisation du pool
const mysql = require('mysql2');
// Récupération du pool dans le fichier de connexion
const pool = require('../public/config/DBconnect');

/**
 * @description SELECT: Liste de toutes les pathologies
 * @returns {Array} Une liste de pathologies
 */
async function getPathologie() {
    try {
        // On récupère la liste des pathologies
        const [rows, fields] = await pool.query("SELECT * FROM pathologie;");
        // On retourne les données pour les utiliser dans le contrôleur
        return rows;
    } catch (err) {
        console.error("Error fetching data from the database:", err);
        throw err;
    }
}

/**
 * @description INSERT INTO: l'ajout d'une nouvelle pathologie
 * @param {Objet} pathologie correspond à toutes les informations d'une nouvelle pathologie
 * @returns {Objet} Retourne les informations de la pathologie ou une erreur
 */
async function addPathologie(pathologie) {
    try {
        // Requete SQL pour ajouter une nouvelle pathologie
        const sql = `
            INSERT INTO pathologie (nom_pathologie)
            VALUES (?)
        `;

        // On execute la requete avec le tableau transmis en parametre
        const result = await pool.query(sql, [pathologie.nom_pathologie]);

        // Retour du resultat
        return result;
    } catch (error) {
        // Gestion des erreurs
        console.error('Error adding pathologie:', error);
        throw error;
    }
}

/**
 * @description SELECT : la recherche d'une pathologie en fonction de son ID
 * @param {*} pathologie correspond à l'id de la pathologie à rechercher
 * @returns {Objet} Retourne les informations de la pathologie pour utilisation ou une erreur
 */
async function findPathologie(pathologie) {
    try {
        const sql = "SELECT * FROM `pathologie` WHERE id_pathologie = ?";

        const [rows, fields] = await pool.query(sql, [pathologie]);

        return rows;
    } catch (error) {
        console.error('Error finding pathologie:', error);
        throw error;
    }
}

/**
 * @description DELETE : la recherche et la suppression existent dans une seule fonction
 * @param {*} pathologie correspond à l'id de la pathologie à supprimer 
 * @returns {id} Retourne l'ID de la pathologie supprimée ou une erreur
 */
async function deletePathologie(pathologie) {
    console.log(pathologie);
    try {
        pool.query("DELETE FROM pathologie WHERE id_pathologie = ?", pathologie);
        return pathologie;
    } catch (error) {
        console.error('Error deleting pathologie:', error);
        throw error;
    }
}

/**
 * @description UPDATE : la modification de la pathologie dans la base de données
 * @param {*} pathologie correspond à l'id de la pathologie à modifier
 * @returns {Objet} Retourne les infos de la pathologie après modification ou une erreur
 */
async function editPathologie(pathologie) {
    try {
        // Requete SQL pour mettre à jour une pathologie
        const sql = `
            UPDATE pathologie
            SET nom_pathologie = ?
            WHERE id_pathologie = ?`;

        // On execute la requete avec le tableau transmis en parametre
        await pool.query(sql, [pathologie.nom_pathologie, pathologie.id_pathologie]);

        return pathologie;
    } catch (error) {
        console.error('Error updating pathologie:', error);
        throw error;
    }
}

// Exports des différentes fonctions
module.exports = {
    getPathologie,
    addPathologie,
    deletePathologie,
    findPathologie,
    editPathologie
};
