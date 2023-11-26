/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Le contrôleur de l'accueil . En fonction de la route choisie, le contrôleur exécute les actions ci-après.
 */

const controllerDefaut={  
	Home(req,res){  
  	    res.render('main')  
	},

	Error(req, res) {
		res.render('404')
	}
}  

module.exports = controllerDefaut; 