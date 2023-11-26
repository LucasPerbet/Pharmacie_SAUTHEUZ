/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Ce fichier contient les fonctions liées au modèle de données des patients.
*/
const pool = require('../public/config/connexion');

/**
 * @description CREATE : Créer un nouveau patient à la fin de la collection 
 * @param {Object} newPatient 
 * @returns {Object} la réponse de MySQL à l'insertion du patient
 */
async function addPatient(newPatient) {
	const query = 'INSERT INTO Patient SET ?';
	const [result] = await pool.query(query, newPatient);
	return result;
  }
  
  /**
   * @description READ : Lire tous les patients 
   * @returns {Array} Une liste de patients
   */
  async function getPatients() {
	const query = 'SELECT * FROM Patient';
	const [rows] = await pool.query(query);
	return rows;
  }
  
  /**
   * @description UPDATE : deux fonctions utiles, l'une pour trouver le patient recherché...
   * @param {*} patientID correspond à l'id du patient
   * @returns {Object} Le premier patient correspondant au critère de recherche
   */
  async function findPatient(patientID) {
	const query = 'SELECT * FROM Patient WHERE id_patient = ?';
	const [rows] = await pool.query(query, [patientID]);
	return rows[0];
  }
  
  /**
   * @description UPDATE : ...l'autre pour modifier le patient édité, dans la base.
   * @param {Object} newPatient qui est l'ensemble des champs d'un patient
   * @returns {Object} Le résultat de MySQL pour la mise à jour
   */
  async function editPatient(newPatient) {
	const query = 'UPDATE Patient SET ? WHERE id_patient = ?';
	const [result] = await pool.query(query, [newPatient, newPatient.id_patient]);
	return result;
  }
  
  /**
   * @description DELETE : la recherche et l'effacement existent dans une seule fonction
   * @param {*} patientID correspond à l'id du patient à supprimer 
   * @returns {Object} La réponse de MySQL
   */
  async function deletePatient(patientID) {
	const query = 'DELETE FROM Patient WHERE id_patient = ?';
	const [result] = await pool.query(query, [patientID]);
	return result;
  }
  
  module.exports = {
	getPatients,
	addPatient,
	findPatient,
	editPatient,
	deletePatient
  };
  
