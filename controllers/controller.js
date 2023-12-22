/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur de l'accueil . En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const modelMedicament = require('../models/modelMedicament');
const modelPrescription = require('../models/modelPrescription');

const controller = {

	async Home(req, res) {
		try {
			const data = await modelMedicament.getMedicament()
			const prescription = await modelPrescription.getPrescription()
			res.render('main', { data: data , prescription: prescription});
		} catch (error) {
			console.error(error);
			res.status(500).send('Erreur du serveur');
		}
	},

	Error(req, res) {
		res.render('404')
	}
}

module.exports = controller; 