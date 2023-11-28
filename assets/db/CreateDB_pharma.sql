CREATE DATABASE IF NOT EXISTS pharmacie;
USE pharmacie;

CREATE TABLE Medecin (
    id_medecin BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_medecin VARCHAR(255) NOT NULL,
    prenom_medecin VARCHAR(255) NOT NULL,
    photo_permis BLOB NOT NULL
);

CREATE TABLE Pathologie (
    id_pathologie BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_pathologie VARCHAR(255) NOT NULL
);

CREATE TABLE Medicament (
    id_medicament BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_medicament VARCHAR(255) NOT NULL,
    qte_en_stock BIGINT NOT NULL,
    format_medicament VARCHAR(255) NOT NULL,
    prix_medicament DECIMAL(8, 2) NOT NULL
);

CREATE TABLE Mutuelle (
    id_mutuelle BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_mutuelle VARCHAR(255) NOT NULL,
    tel_mutuelle VARCHAR(255) NOT NULL,
    mail_mutuelle VARCHAR(255) NOT NULL
);

CREATE TABLE Pharmacien (
    id_pharmacien BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_pharmacien VARCHAR(255) NOT NULL,
    prenom_pharmacien VARCHAR(255) NOT NULL,
    identifiant_pharmacien VARCHAR(255) NOT NULL,
    mdp_pharmacien VARCHAR(255) NOT NULL
);

CREATE TABLE Patient (
    id_patient BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    num_secu_sociale VARCHAR(15) NOT NULL,
    nom_patient VARCHAR(50) NOT NULL,
    prenom_patient VARCHAR(50) NOT NULL,
    date_naissance DATE NOT NULL,
    id_mutuelle BIGINT NOT NULL,
    UNIQUE (num_secu_sociale),
    FOREIGN KEY (id_mutuelle) REFERENCES Mutuelle (id_mutuelle)
);

CREATE TABLE Ordonnance (
    id_ordonnance BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_patient BIGINT NOT NULL,
    id_medecin BIGINT NOT NULL,
    id_pathologie BIGINT NOT NULL,
    date_ordonnance DATE NOT NULL,
    FOREIGN KEY (id_patient) REFERENCES Patient (id_patient),
    FOREIGN KEY (id_medecin) REFERENCES Medecin (id_medecin),
    FOREIGN KEY (id_pathologie) REFERENCES Pathologie (id_pathologie)
);

CREATE TABLE Medicament_Ordonnance (
    id_medicament_ordonnance BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_medicament BIGINT NOT NULL,
    id_ordonnance BIGINT NOT NULL,
    qte_prescrite BIGINT NOT NULL,
    duree_mois BIGINT NOT NULL,
    FOREIGN KEY (id_medicament) REFERENCES Medicament (id_medicament),
    FOREIGN KEY (id_ordonnance) REFERENCES Ordonnance (id_ordonnance),
    INDEX idx_medicament_ordonnance (id_medicament, id_ordonnance)
);



