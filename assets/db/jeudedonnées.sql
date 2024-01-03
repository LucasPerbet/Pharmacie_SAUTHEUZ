-- Jeu de données pour la table `medecin`
INSERT INTO `medecin` (`nom_medecin`, `prenom_medecin`) VALUES
('Dupont', 'Jean'),
('Martin', 'Sophie'),
('Lefevre', 'Pierre');

-- Jeu de données pour la table `medicament`
INSERT INTO `medicament` (`nom_medicament`, `qte_en_stock`, `format_medicament`, `prix_medicament`) VALUES
('Paracetamol', 500, 'Comprimé', 5.99),
('Ibuprofene', 300, 'Gélule', 7.50),
('Amoxicilline', 200, 'Sirop', 12.75);

-- Jeu de données pour la table `mutuelle`
INSERT INTO `mutuelle` (`nom_mutuelle`, `tel_mutuelle`, `mail_mutuelle`) VALUES
('Mutuelle A', '0123456789', 'info@mutuelleA.com'),
('Mutuelle B', '0987654321', 'info@mutuelleB.com'),
('Mutuelle C', '1112233445', 'info@mutuelleC.com');

-- Jeu de données pour la table `pathologie`
INSERT INTO `pathologie` (`nom_pathologie`) VALUES
('Rhume'),
('Allergie'),
('Hypertension');

-- Jeu de données pour la table `patient`
INSERT INTO `patient` (`num_secu_sociale`, `nom_patient`, `prenom_patient`, `date_naissance`, `id_mutuelle`) VALUES
('123456789012345', 'Dubois', 'Marie', '1990-05-15', 1),
('987654321098765', 'Leroux', 'Thomas', '1985-08-23', 2),
('111223344556677', 'Moreau', 'Laura', '2000-02-10', 3);

-- Jeu de données pour la table `pharmacien`
INSERT INTO `pharmacien` (`nom_pharmacien`, `prenom_pharmacien`, `identifiant_pharmacien`, `mdp_pharmacien`) VALUES
('Girard', 'Philippe', 'pharma1', 'password1'),
('Leclerc', 'Isabelle', 'pharma2', 'password2'),
('Roux', 'Luc', 'pharma3', 'password3');

-- Jeu de données pour la table `prescriptions`
INSERT INTO `prescriptions` (`id_patient`, `id_medicament`, `date_prescription`, `posologie`) VALUES
(1, 1, '2023-12-10', '1 comprimé toutes les 6 heures'),
(2, 2, '2023-11-25', '2 gélules par jour'),
(3, 3, '2024-01-02', '1 cuillère à soupe trois fois par jour');
