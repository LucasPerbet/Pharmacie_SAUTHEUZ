/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des patients
*/

const mysql = require('mysql2');

const pool = require('../public/config/DBconnect');

async function getPatient() {
    try {
        // On recupre la liste des patients
        const [rows, fields] = await pool.query("SELECT * FROM `patient`");
        
        console.log(rows);
        // On retourne les donnees pour les utiliser dans le controleur
        return rows;
    } catch (err) {
        // Gestion des erreurs
        console.error("Error fetching data from the database:", err);
        throw err; // You might want to handle the error or throw it to the caller
    }
}

module.exports = {
    getPatient
};
