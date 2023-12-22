/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des médicaments
*/

// Module mysql2 pour utilisation du pool
const mysql = require('mysql2');
// Récupération du pool dans le fichier de connexion
const pool = require('../public/config/DBconnect');

/**
 * @description SELECT: Liste de tous les médicaments
 * @returns {Array} Une liste de médicaments
 */
async function getMedicament() {
    try {
        const [rows, fields] = await pool.query("SELECT id_medicament, nom_medicament, qte_en_stock, format_medicament, prix_medicament FROM `medicament`");
        return rows;
    } catch (err) {
        console.error("Error fetching data from the database:", err);
        throw err;
    }
}

/**
 * @description INSERT INTO: Ajout d'un nouveau médicament
 * @param {Objet} medicament correspond à toutes les informations d'un nouveau médicament
 * @returns {Objet} Retourne les informations du médicament ajouté ou une erreur
 */
async function addMedicament(medicament) {
    try {
        const sql = `
            INSERT INTO medicament (nom_medicament, qte_en_stock, format_medicament, prix_medicament)
            VALUES (?, ?, ?, ?)
        `;

        const result = await pool.query(sql, [
            medicament.nom_medicament,
            medicament.qte_en_stock,
            medicament.format_medicament,
            medicament.prix_medicament
        ]);

        return result;
    } catch (error) {
        console.error('Error adding medicament:', error);
        throw error;
    }
}

/**
 * @description SELECT : Recherche d'un médicament en fonction de son ID
 * @param {*} medicament correspond à l'id du médicament à rechercher
 * @returns {Objet} Retourne les informations du médicament pour utilisation ou une erreur
 */
async function findMedicament(medicament) {
    try {
        const sql = "SELECT id_medicament, nom_medicament, qte_en_stock, format_medicament, prix_medicament FROM `medicament` WHERE id_medicament = ?";
        const [rows, fields] = await pool.query(sql, [medicament]);
        return rows;
    } catch (error) {
        console.error('Error finding medicament:', error);
        throw error;
    }
}

/**
 * @description DELETE : Recherche et effacement d'un médicament existant
 * @param {*} medicament correspond à l'id du médicament à supprimer 
 * @returns {id} Retourne l'ID du médicament supprimé ou une erreur
 */
async function deleteMedicament(medicament) {
    try {
        await pool.query("DELETE FROM medicament WHERE id_medicament = ?", medicament);
        return medicament;
    } catch (error) {
        console.error('Error deleting medicament:', error);
        throw error;
    }
}

/**
 * @description UPDATE : Modification d'un médicament dans la base de données
 * @param {*} medicament correspond à l'id du médicament à modifier
 * @returns {Objet} Retourne les infos du médicament après modification ou une erreur
 */
async function editMedicament(medicament) {
    try {
        const { nom_medicament, qte_en_stock, format_medicament, prix_medicament, id_medicament } = medicament;
        const sql = `
            UPDATE medicament
            SET nom_medicament = ?, qte_en_stock = ?, format_medicament = ?, prix_medicament = ?
            WHERE id_medicament = ?`;
        await pool.query(sql, [nom_medicament, qte_en_stock, format_medicament, prix_medicament, id_medicament]);
        return medicament;
    } catch (error) {
        console.error('Error updating medicament:', error);
        throw error;
    }
}

// Exports des différentes fonctions
module.exports = {
    getMedicament,
    addMedicament,
    deleteMedicament,
    findMedicament,
    editMedicament
};
