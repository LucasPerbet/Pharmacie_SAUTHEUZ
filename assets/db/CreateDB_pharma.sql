
-- Création de la base de données `pharmacie`
CREATE DATABASE IF NOT EXISTS `pharmacie`;
USE `pharmacie`;

--
-- Structure de la table `medecin`
--

CREATE TABLE IF NOT EXISTS `medecin` (
  `id_medecin` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_medecin` varchar(255) NOT NULL,
  `prenom_medecin` varchar(255) NOT NULL,
  PRIMARY KEY (`id_medecin`)
);

--
-- Structure de la table `medicament`
--

CREATE TABLE IF NOT EXISTS `medicament` (
  `id_medicament` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_medicament` varchar(255) NOT NULL,
  `qte_en_stock` bigint NOT NULL,
  `format_medicament` varchar(255) NOT NULL,
  `prix_medicament` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id_medicament`)
);

--
-- Structure de la table `mutuelle`
--

CREATE TABLE IF NOT EXISTS `mutuelle` (
  `id_mutuelle` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_mutuelle` varchar(255) NOT NULL,
  `tel_mutuelle` varchar(255) NOT NULL,
  `mail_mutuelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_mutuelle`)
);

--
-- Structure de la table `pathologie`
--

CREATE TABLE IF NOT EXISTS `pathologie` (
  `id_pathologie` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_pathologie` varchar(255) NOT NULL,
  PRIMARY KEY (`id_pathologie`)
);

--
-- Structure de la table `patient`
--

CREATE TABLE IF NOT EXISTS `patient` (
  `id_patient` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `num_secu_sociale` varchar(15) NOT NULL,
  `nom_patient` varchar(50) NOT NULL,
  `prenom_patient` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `id_mutuelle` bigint NOT NULL,
  PRIMARY KEY (`id_patient`),
  UNIQUE KEY `num_secu_sociale` (`num_secu_sociale`),
  KEY `id_mutuelle` (`id_mutuelle`)
);

--
-- Structure de la table `pharmacien`
--

CREATE TABLE IF NOT EXISTS `pharmacien` (
  `id_pharmacien` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_pharmacien` varchar(255) NOT NULL,
  `prenom_pharmacien` varchar(255) NOT NULL,
  `identifiant_pharmacien` varchar(255) NOT NULL,
  `mdp_pharmacien` varchar(255) NOT NULL,
  PRIMARY KEY (`id_pharmacien`)
);

--
-- Structure de la table `prescriptions`
--

CREATE TABLE IF NOT EXISTS `prescriptions` (
  `id_prescription` int NOT NULL AUTO_INCREMENT,
  `id_patient` int DEFAULT NULL,
  `id_medicament` int DEFAULT NULL,
  `date_prescription` date DEFAULT NULL,
  `posologie` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_prescription`),
  KEY `id_patient` (`id_patient`),
  KEY `id_medicament` (`id_medicament`)
);
