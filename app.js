/**
 * @author Lucas PERBET
 * @version 1.0.0
 * @description Projet de 2ème année BTS SIO SLAM. L'objectif est de coder l'intranet d'un pharmacie,
 *              pour la gestion des ordonnances et des médicaments.
 */


/************************* ---- Gestion des modules ---- *****************************/

// Recuperation des modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const pool = require('./public/config/DBconnect.js');
const routes = require('./routes/routes.js');
const patientRoutes = require('./routes/patientRoutes.js');
const mutuelleRoutes = require('./routes/mutuelleRoutes.js');
const medicamentRoutes = require('./routes/medicamentRoutes.js');

/**********************************************************************************************************************************************/

/************************* ---- Gestion de l'instance Express JS ---- *****************************/

// Initialisation de l'instance ExpressJS
const app = express();

// Definition du chemin des vues
app.set("views",path.resolve(__dirname,'views'));
app.use(express.static('public'));

// Utilisation de EJS
app.set('view engine', 'ejs');

// Configuration du traitement des formulaires de requete HTTP
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Gestion des routes
app.use('/medicament/',medicamentRoutes);
app.use('/patient/',patientRoutes);
app.use('/mutuelle/',mutuelleRoutes);
app.use('/',routes);

// Définition du port de l'application
const port = process.env.port || 3000;

// Demmarge de l'app
app.listen(port, () => console.log('Le serveur est démarré sur le port : ' +port));

// Export de l'app
module.exports = app;
/**********************************************************************************************************************************************/