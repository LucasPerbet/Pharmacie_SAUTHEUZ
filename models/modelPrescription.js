// modelPrescription.js

const mysql = require('mysql2');
const pool = require('../public/config/DBconnect');

async function getPrescription() {
    try {
        const [rows, fields] = await pool.query(`
            SELECT prescriptions.id_prescription, prescriptions.date_prescription, prescriptions.posologie, 
                   patient.nom_patient, patient.prenom_patient, 
                   medicament.nom_medicament
            FROM prescriptions
            JOIN patient ON prescriptions.id_patient = patient.id_patient
            JOIN medicament ON prescriptions.id_medicament = medicament.id_medicament;
        `);
        return rows;
    } catch (err) {
        console.error("Error fetching prescription data from the database:", err);
        throw err;
    }
}

async function addPrescription(prescription) {
    try {
        const sql = `
            INSERT INTO prescriptions (id_patient, id_medicament, date_prescription, posologie)
            VALUES (?, ?, ?, ?)
        `;
        const result = await pool.query(sql, [
            prescription.id_patient,
            prescription.id_medicament,
            prescription.date_prescription,
            prescription.posologie
        ]);
        return result;
    } catch (error) {
        console.error('Error adding prescription:', error);
        throw error;
    }
}

async function findPrescription(prescriptionId) {
    try {
        const sql = `
            SELECT id_prescription, id_patient, id_medicament, date_prescription, posologie
            FROM prescriptions
            WHERE id_prescription = ?
        `;
        const [rows, fields] = await pool.query(sql, [prescriptionId]);
        return rows;
    } catch (error) {
        console.error('Error finding prescription:', error);
        throw error;
    }
}

async function deletePrescription(prescriptionId) {
    try {
        await pool.query("DELETE FROM prescriptions WHERE id_prescription = ?", [prescriptionId]);
        return prescriptionId;
    } catch (error) {
        console.error('Error deleting prescription:', error);
        throw error;
    }
}

async function editPrescription(prescription) {
    try {
        const sql = `
            UPDATE prescriptions
            SET id_patient = ?, id_medicament = ?, date_prescription = ?, posologie = ?
            WHERE id_prescription = ?
        `;
        const result = await pool.query(sql, [
            prescription.id_patient,
            prescription.id_medicament,
            prescription.date_prescription,
            prescription.posologie,
            prescription.id_prescription
        ]);
        return result;
    } catch (error) {
        console.error('Error editing prescription:', error);
        throw error;
    }
}

module.exports = {
    getPrescription,
    addPrescription,
    deletePrescription,
    findPrescription,
    editPrescription
};
