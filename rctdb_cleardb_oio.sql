-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jul 30, 2023 at 11:36 PM
-- Server version: 10.10.2-MariaDB
-- PHP Version: 8.0.26

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rctdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `arrondissement`
--

DROP TABLE IF EXISTS `arrondissement`;
CREATE TABLE IF NOT EXISTS `arrondissement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `departement` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_arrondissement_departement1` (`departement`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `arrondissement`
--

INSERT INTO `arrondissement` (`id`, `code`, `designation`, `description`, `departement`) VALUES
(1, 'ARRTSI', 'Tsinga', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `sexe` varchar(1) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `adresse_mail` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `type_client` enum('premium','simple','class') DEFAULT NULL,
  `nationalite` int(11) NOT NULL,
  `organisme` int(11) NOT NULL,
  `attestation` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_client_pays1` (`nationalite`),
  KEY `fk_client_organisme1` (`organisme`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `nom`, `prenom`, `sexe`, `date_naissance`, `adresse_mail`, `telephone`, `type_client`, `nationalite`, `organisme`, `attestation`) VALUES
(1, 'Nguén', 'Kévina Anne', 'F', '2000-07-17', 'annekevinnguen091@gmail.com', '657244570', 'simple', 1, 3, '1_DOCDIP_01_20230617'),
(2, 'Nguén', 'Osée Roger', 'M', '1969-04-29', 'oseeroger@yahoo.fr', '697906601', 'premium', 1, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `continent`
--

DROP TABLE IF EXISTS `continent`;
CREATE TABLE IF NOT EXISTS `continent` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `designation` varchar(150) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `disabled` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `continent_uq` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `continent`
--

INSERT INTO `continent` (`id`, `code`, `designation`, `description`, `disabled`) VALUES
(2000, 'ASIA', 'Asie Centrale', 'Chinois, Japonais, XXX', 0),
(3000, 'EUR', 'Europe', NULL, 0),
(4000, 'AMN', 'Amerique du nord', NULL, 0),
(10000, 'AFR', 'Afrique', '', 0),
(10001, 'ANT', 'Antarctique', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `demande`
--

DROP TABLE IF EXISTS `demande`;
CREATE TABLE IF NOT EXISTS `demande` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personne` varchar(20) NOT NULL,
  `date_envoie` varchar(100) NOT NULL,
  `date_reponse` varchar(100) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `type_demande` int(11) NOT NULL,
  `statut` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_personne` (`personne`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `demande`
--

INSERT INTO `demande` (`id`, `personne`, `date_envoie`, `date_reponse`, `info`, `type_demande`, `statut`) VALUES
(5, '04545', '17/07/2023 08:50:19', '17/07/2023', 'null', 1, 2),
(6, '0007', '20/07/2023 08:56:49', '20/07/2023', 'null', 1, 2),
(8, '01728', '26/07/2023 01:17:52', '28/07/2023', 'null', 1, 3),
(9, '0044XDEl27', '28/07/2023 18:37:52', '30/07/2023', 'null', 1, 3),
(10, 'cdf', '30/07/2023 01:42:39', '30/07/2023', 'null', 1, 3),
(11, '01729', '30/07/2023 14:45:05', '30/07/2023', 'null', 1, 3),
(12, '0484950', '30/07/2023 15:01:45', '30/07/2023', 'null', 1, 3),
(13, '04717', '30/07/2023 15:05:18', '30/07/2023', 'null', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `departement`
--

DROP TABLE IF EXISTS `departement`;
CREATE TABLE IF NOT EXISTS `departement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `region` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `region` (`region`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `departement`
--

INSERT INTO `departement` (`id`, `code`, `designation`, `description`, `region`) VALUES
(1, 'DEPMFD', 'Mfoundi', '', 1),
(2, 'DEPHSA', 'Haute Sanaga', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `domaine`
--

DROP TABLE IF EXISTS `domaine`;
CREATE TABLE IF NOT EXISTS `domaine` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `designation` varchar(50) DEFAULT NULL,
  `description` int(250) DEFAULT NULL,
  `numero_ordre` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `domaine`
--

INSERT INTO `domaine` (`id`, `designation`, `description`, `numero_ordre`) VALUES
(1, 'Identité du practicien', NULL, 1),
(2, 'Formation Sanitaire', NULL, 2),
(3, 'Identité du patient', NULL, 3),
(4, 'Histoire de la maladie', NULL, 4),
(5, 'Antecedents médicaux', NULL, 5),
(6, 'Comorbidités', NULL, 6),
(7, 'Enquetes des systèmes', NULL, 7),
(8, 'Examen physique', NULL, 8),
(9, 'Radiographies initiales', NULL, 9),
(10, 'Diagnostic des lesions musculotiques- ICD 10', NULL, 10),
(11, 'Score prédictifs - Trauma scores', NULL, 11),
(12, 'Statut clinique pré-thérapeutique', NULL, 12),
(13, 'Consultation d\'anésthesie', NULL, 13),
(14, 'Examens paracliniques', NULL, 14),
(15, 'Motif de consultation', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dossier`
--

DROP TABLE IF EXISTS `dossier`;
CREATE TABLE IF NOT EXISTS `dossier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient` int(11) NOT NULL,
  `dateEntree` varchar(50) DEFAULT NULL,
  `dateSortie` varchar(50) DEFAULT NULL,
  `statut` int(11) NOT NULL DEFAULT 11,
  `visibilite` tinyint(1) DEFAULT NULL,
  `transfert` tinyint(1) DEFAULT NULL,
  `transfertNb` int(11) DEFAULT NULL,
  `puffer` tinyint(1) DEFAULT NULL,
  `pufferNb` int(11) DEFAULT NULL,
  `formation_sanitaire` int(11) DEFAULT 1,
  `disabled` int(11) DEFAULT NULL,
  `lastUpdate` varchar(50) DEFAULT NULL,
  `enregistrer_par` int(11) DEFAULT NULL,
  `date_traumatisme` varchar(200) DEFAULT NULL,
  `date_enregistrement` varchar(200) DEFAULT NULL,
  `praticien` varchar(11) DEFAULT '0007',
  `mode` int(11) DEFAULT NULL,
  `step` varchar(11) DEFAULT '1',
  `last` int(11) DEFAULT 1,
  `deces` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_patient` (`patient`),
  KEY `fk_fs` (`formation_sanitaire`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `dossier`
--

INSERT INTO `dossier` (`id`, `patient`, `dateEntree`, `dateSortie`, `statut`, `visibilite`, `transfert`, `transfertNb`, `puffer`, `pufferNb`, `formation_sanitaire`, `disabled`, `lastUpdate`, `enregistrer_par`, `date_traumatisme`, `date_enregistrement`, `praticien`, `mode`, `step`, `last`, `deces`) VALUES
(45, 9, '2023-07-20 02-07-57', NULL, 20, 1, 0, 0, 1, 0, 1, 0, '20/07/2023 02:55:07', NULL, NULL, NULL, '0007', 0, '2', 1, 0),
(46, 10, '2023-07-20 12:07:33', NULL, 2, 1, 0, 0, 0, 0, 5, 0, '2023-07-20 12:07:34', NULL, NULL, NULL, '0007', 1, '1', 1, 0),
(50, 10, 'Fri, 30 Jun 2023 19:04:08 GMT', NULL, 20, 1, 1, 0, 0, 0, 6, 0, '23/07/2023 20:04:22', NULL, NULL, NULL, '04545', 5, '2', 1, 0),
(51, 9, 'Mon, 17 Jul 2023 22:07:24 GMT', NULL, 11, 1, 0, 0, 0, 0, 6, 0, '30/07/2023 23:07:27', NULL, NULL, NULL, '04545', NULL, '1', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `elt_dossier`
--

DROP TABLE IF EXISTS `elt_dossier`;
CREATE TABLE IF NOT EXISTS `elt_dossier` (
  `dossier` int(11) NOT NULL,
  `rubrique` char(4) NOT NULL,
  `valeur` varchar(250) NOT NULL,
  `date_update` varchar(50) DEFAULT NULL,
  `auteur` int(11) DEFAULT NULL,
  `statut` int(11) DEFAULT NULL,
  PRIMARY KEY (`dossier`,`rubrique`,`valeur`),
  KEY `fk_rubrique` (`rubrique`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `elt_dossier`
--

INSERT INTO `elt_dossier` (`dossier`, `rubrique`, `valeur`, `date_update`, `auteur`, `statut`) VALUES
(45, '0041', '0041002', '26/07/2023 09:46:50', NULL, 1),
(45, '0040', '0040001', '26/07/2023 09:46:50', NULL, 1),
(46, '0041', '0041004', '26/07/2023 09:30:36', NULL, 1),
(46, '0040', '0040001', '26/07/2023 09:30:36', NULL, 1),
(46, '2005', '0000000', '26/07/2023 09:24:30', NULL, 1),
(46, '2004', '0000000', '26/07/2023 09:24:30', NULL, 1),
(46, '2003', '0000000', '26/07/2023 09:24:30', NULL, 1),
(46, '2002', '0000000', '26/07/2023 09:24:30', NULL, 1),
(46, '2001', '0000000', '26/07/2023 09:24:30', NULL, 1),
(46, '2000', '0000000', '26/07/2023 09:24:30', NULL, 1),
(46, '0029', '0029001', '26/07/2023 09:23:46', NULL, 1),
(46, '0033', 'just write something', '26/07/2023 09:23:46', NULL, 1),
(46, '0032', 'write something', '26/07/2023 09:23:46', NULL, 1),
(46, '0031', 'just write something', '26/07/2023 09:23:46', NULL, 1),
(46, '0030', 'write something', '26/07/2023 09:23:46', NULL, 1),
(46, '0028', '0028002', '26/07/2023 09:23:46', NULL, 1),
(46, '0027', '0027001', '26/07/2023 09:23:46', NULL, 1),
(46, '0026', '0026002', '26/07/2023 09:23:46', NULL, 1),
(46, '0025', '0025002', '26/07/2023 09:23:46', NULL, 1),
(46, '0024', '0024001', '26/07/2023 09:23:46', NULL, 1),
(46, '0023', '0023002', '26/07/2023 09:23:46', NULL, 1),
(46, '0022', '0022002', '26/07/2023 09:23:46', NULL, 1),
(46, '0021', '0021001', '26/07/2023 09:23:46', NULL, 1),
(46, '0020', '0020002', '26/07/2023 09:23:46', NULL, 1),
(46, '1007', '18', '26/07/2023 09:23:46', NULL, 1),
(46, '1006', '450', '26/07/2023 09:23:46', NULL, 1),
(46, '1005', '17', '26/07/2023 09:23:46', NULL, 1),
(46, '1004', '12.47', '26/07/2023 09:23:46', NULL, 1),
(50, '2005', '0000000', '25/07/2023 15:58:58', NULL, 1),
(50, '2004', '0000000', '25/07/2023 15:58:58', NULL, 1),
(50, '2003', '0000000', '25/07/2023 15:58:58', NULL, 1),
(50, '2002', '0000000', '25/07/2023 15:58:58', NULL, 1),
(50, '2001', '0000000', '25/07/2023 15:58:58', NULL, 1),
(50, '2000', '7', '25/07/2023 15:58:58', NULL, 1),
(50, '0029', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0033', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0032', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0031', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0030', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0028', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0027', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0026', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0025', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0024', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0023', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0022', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0021', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '0020', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '1007', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '1006', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '1005', '0000000', '25/07/2023 15:48:27', NULL, 1),
(50, '1004', '0000000', '25/07/2023 15:48:27', NULL, 1),
(46, '0007', '0007003', '24/07/2023 16:50:43', NULL, 1),
(46, '0006', '0006003', '24/07/2023 16:50:43', NULL, 1),
(46, '0005', '0005002', '24/07/2023 16:50:43', NULL, 1),
(46, '1003', 'Invalid Date', '24/07/2023 16:50:43', NULL, 1),
(50, '0007', '0007002', '24/07/2023 14:16:21', NULL, 1),
(50, '0006', '0006001', '24/07/2023 14:16:21', NULL, 1),
(50, '0005', '0005001', '24/07/2023 14:16:21', NULL, 1),
(50, '1003', '14/06/2023 14:16:00', '24/07/2023 14:16:21', NULL, 1),
(50, '0041', '0041003', '26/07/2023 08:54:58', NULL, 1),
(50, '0040', '0040001', '26/07/2023 08:54:58', NULL, 1),
(45, '2005', '0000000', '24/07/2023 09:11:01', NULL, 1),
(45, '2004', '0000000', '24/07/2023 09:11:01', NULL, 1),
(45, '2003', '0000000', '24/07/2023 09:11:01', NULL, 1),
(45, '2002', '0000000', '24/07/2023 09:11:01', NULL, 1),
(45, '2001', '0000000', '24/07/2023 09:11:01', NULL, 1),
(45, '2000', '12', '24/07/2023 09:11:01', NULL, 1),
(45, '1011', 'les 1', '24/07/2023 08:48:46', NULL, 1),
(45, '1010', 'les 2', '24/07/2023 08:48:46', NULL, 1),
(45, '1009', 'les 1', '24/07/2023 08:48:46', NULL, 1),
(45, '1008', 'Class AO 1', '24/07/2023 08:48:46', NULL, 1),
(50, '0004', '0004003', '23/07/2023 20:04:48', NULL, 1),
(50, '0003', '0003003', '23/07/2023 20:04:48', NULL, 1),
(50, '1001', '1', '23/07/2023 20:04:48', NULL, 1),
(50, '1000', '1', '23/07/2023 20:04:48', NULL, 1),
(45, '0029', '0029002', '23/07/2023 19:34:26', NULL, 1),
(45, '0029', '0029001', '23/07/2023 19:34:26', NULL, 1),
(45, '0033', 'appareil endommagé 4', '23/07/2023 19:34:26', NULL, 1),
(45, '0032', 'appareil endommagé 3', '23/07/2023 19:34:26', NULL, 1),
(45, '0031', 'appareil endommagé 2', '23/07/2023 19:34:26', NULL, 1),
(45, '0028', '0028002', '23/07/2023 19:34:26', NULL, 1),
(46, '0004', '0004003', '23/07/2023 16:14:55', NULL, 1),
(46, '0003', '0003001', '23/07/2023 16:14:55', NULL, 1),
(46, '1001', '1', '23/07/2023 16:14:55', NULL, 1),
(46, '1000', '1', '23/07/2023 16:14:55', NULL, 1),
(45, '0030', 'appareil endommagé', '23/07/2023 19:34:26', NULL, 1),
(45, '0027', '0027001', '23/07/2023 19:34:26', NULL, 1),
(45, '0026', '0026001', '23/07/2023 19:34:26', NULL, 1),
(45, '0025', '0025002', '23/07/2023 19:34:26', NULL, 1),
(45, '0024', '0024002', '23/07/2023 19:34:26', NULL, 1),
(45, '0023', '0023003', '23/07/2023 19:34:26', NULL, 1),
(45, '0022', '0022001', '23/07/2023 19:34:26', NULL, 1),
(45, '0022', '0022003', '23/07/2023 19:34:26', NULL, 1),
(45, '0022', '0022002', '23/07/2023 19:34:26', NULL, 1),
(45, '0021', '0021001', '23/07/2023 19:34:26', NULL, 1),
(45, '0021', '0021002', '23/07/2023 19:34:26', NULL, 1),
(45, '0020', '0020001', '23/07/2023 19:34:26', NULL, 1),
(45, '0020', '0020003', '23/07/2023 19:34:26', NULL, 1),
(45, '1007', '38.9', '23/07/2023 19:34:26', NULL, 1),
(45, '1006', '17.50', '23/07/2023 19:34:26', NULL, 1),
(45, '1005', '39.55', '23/07/2023 19:34:26', NULL, 1),
(45, '1004', '13.29', '23/07/2023 19:34:26', NULL, 1),
(45, '1007', '22.3', '20/07/2023 03:00:41', NULL, 1),
(45, '1006', '254', '20/07/2023 03:00:41', NULL, 1),
(45, '1005', '35.8', '20/07/2023 03:00:41', NULL, 1),
(45, '1004', '14', '20/07/2023 03:00:41', NULL, 1),
(45, '0007', '0007004', '20/07/2023 02:56:24', NULL, 1),
(45, '0006', '0006003', '20/07/2023 02:56:24', NULL, 1),
(45, '0005', '0005002', '20/07/2023 02:56:24', NULL, 1),
(45, '1003', '26/06/2023 02:55:51', '20/07/2023 02:56:24', NULL, 1),
(45, '0004', '0004001', '20/07/2023 02:55:47', NULL, 1),
(45, '0003', '0003001', '20/07/2023 02:55:47', NULL, 1),
(45, '1001', '0', '20/07/2023 02:55:47', NULL, 1),
(45, '1000', '1', '20/07/2023 02:55:47', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `elt_rubrique`
--

DROP TABLE IF EXISTS `elt_rubrique`;
CREATE TABLE IF NOT EXISTS `elt_rubrique` (
  `id` char(7) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `rubrique` char(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rubrique` (`rubrique`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `elt_rubrique`
--

INSERT INTO `elt_rubrique` (`id`, `designation`, `description`, `rubrique`) VALUES
('0000000', 'Inconnu', '', '0000'),
('0003001', 'Accident domestique', '', '0003'),
('0003003', 'Accident de travail', '', '0003'),
('0003004', 'Accident de sport', '', '0003'),
('0003005', 'Accident lors d\'activités ludiques', '', '0003'),
('0004001', 'AVP Pieton', '', '0004'),
('0004002', 'AVP bicyclette', '', '0004'),
('0004003', 'AVP moto', '', '0004'),
('0004004', 'AVP voiture-bus-camion', '', '0004'),
('0005001', 'Agent de santé', '', '0005'),
('0005002', 'Secouriste', '', '0005'),
('0005003', 'Infirmier', '', '0005'),
('0006001', '1h', '1 heure', '0006'),
('0006002', '6h', '6 heures', '0006'),
('0006003', '12h', '12 heures', '0006'),
('0007001', 'à pied', '', '0007'),
('0007002', 'à dos d\'homme', '', '0007'),
('0007003', 'brouette', '', '0007'),
('0007004', 'hamac', '', '0007'),
('0010001', 'Douleurs généralisées', '', '0010'),
('0010002', 'Douleurs localisées', '', '0010'),
('0010003', 'Etat d\'ébrieté', '', '0010'),
('0011001', 'Douleurs', '', '0011'),
('0011002', 'Impotence fonctionnelle', '', '0011'),
('0011003', 'Sensibilité', '', '0011'),
('0012001', 'Sensation de soif', '', '0012'),
('0012002', 'Froideur des extremités', '', '0012'),
('0013001', 'douleurs thoraciques', '', '0013'),
('0013002', 'dyspnée', '', '0013'),
('0014001', 'tachycardie', '', '0014'),
('0014002', 'palpitations', '', '0014'),
('0014003', 'vertiges', '', '0014'),
('0015001', 'douleurs abdominales', '', '0015'),
('0015002', 'arrêt des matières et des gaz', '', '0015'),
('0015003', 'ballonements', '', '0015'),
('0016001', 'miction douleureuse', '', '0016'),
('0016002', 'retention aigue d\'urine', '', '0016'),
('0016003', 'hématurie', '', '0016'),
('0020001', 'ecorchures', '', '0020'),
('0020002', 'hématomes cutanées', '', '0020'),
('0020003', 'brûlures', '', '0020'),
('0021001', 'epaule', '', '0021'),
('0021002', 'coude', '', '0021'),
('0021003', 'semi-lunaire', '', '0021'),
('0022001', 'omoplate', '', '0022'),
('0022002', 'clavicule', '', '0022'),
('0022003', 'humérus', '', '0022'),
('0023001', 'Fracture fermée', '', '0023'),
('0023002', 'Fracture o. Gustilo Anderson I', '', '0023'),
('0023003', 'Fracture o. Gustilo Anderson II', '', '0023'),
('0024001', 'Fracture en bois vert', '', '0024'),
('0024002', 'Fracture en cheveu', '', '0024'),
('0024003', 'Fracture en motte de beurre', '', '0024'),
('0025001', 'pâle', '', '0025'),
('0025002', 'normale', '', '0025'),
('0026001', 'absent', '', '0026'),
('0026002', 'faible', '', '0026'),
('0026003', 'normale', '', '0026'),
('0027001', 'chaud', '', '0027'),
('0027002', 'froid', '', '0027'),
('0028001', 'absente', '', '0028'),
('0028002', 'réduite', '', '0028'),
('0028003', 'conservée', '', '0028'),
('0029001', 'humérus', '', '0029'),
('0029002', 'radius et cubitus', '', '0029'),
('0029003', 'fémur', '', '0029'),
('0040001', 'mono traumatisé', '', '0040'),
('0040002', 'poly traumatisé', '', '0040'),
('0041001', 'Traitement', '', '0041'),
('0041002', 'Sortie contre avis médical', '', '0041'),
('0041003', 'Transfert', '', '0041'),
('0041004', 'Décès', '', '0041'),
('8000001', 'Certificat médical', '', '8000'),
('8000002', 'CNI', '', '8000'),
('8000003', 'Expertise médicale', '', '8000'),
('8002001', 'ONG', 'Organisation Non Gouvernementale', '8002'),
('8002002', 'Réseau de traumatologie', '', '8002'),
('8002100', 'Formation sanitaire', '', '8002'),
('8002101', 'Centre de santé', '', '8002'),
('8002102', 'Clinique', '', '8002'),
('8002200', 'Entreprise', '', '8002'),
('8002201', 'Entreprise privée', '', '8002'),
('8002202', 'Entreprise publique', '', '8002'),
('8002203', 'Entreprise parapublique', '', '8002'),
('9000001', 'Sans', '', '9000'),
('9000002', 'Catholique', '', '9000'),
('9000003', 'Protestant', '', '9000'),
('9001000', 'Chomeur', '', '9001'),
('9001001', 'Elève / Etudiant', '', '9001'),
('9001002', 'Stagiare', '', '9001'),
('9002001', 'Traumatologue', 'Spécialiste des traumatismes physiques', '9002'),
('9002002', 'Chirugien', 'Chirugien orthopédique', '9002'),
('9002003', 'Anesthésiste', '', '9002');

-- --------------------------------------------------------

--
-- Table structure for table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
CREATE TABLE IF NOT EXISTS `medecin` (
  `id` varchar(11) NOT NULL,
  `nom` varchar(200) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `sexe` varchar(1) DEFAULT NULL,
  `date_naissance` varchar(100) DEFAULT NULL,
  `adresse_mail` varchar(100) DEFAULT NULL,
  `adresse` varchar(200) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `type_medecin` enum('premium','simple','class') DEFAULT NULL,
  `nationalite` int(11) DEFAULT NULL,
  `date_fonction` varchar(100) DEFAULT NULL,
  `qualification` char(7) DEFAULT NULL,
  `nb_experience` int(11) DEFAULT NULL,
  `identite` varchar(50) DEFAULT NULL,
  `attestation` varchar(50) DEFAULT NULL,
  `disabled` int(11) DEFAULT NULL,
  `statut` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`,`prenom`,`date_naissance`,`sexe`),
  KEY `fk_medecin_pays` (`nationalite`),
  KEY `fk_qualification` (`qualification`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `medecin`
--

INSERT INTO `medecin` (`id`, `nom`, `prenom`, `sexe`, `date_naissance`, `adresse_mail`, `adresse`, `telephone`, `type_medecin`, `nationalite`, `date_fonction`, `qualification`, `nb_experience`, `identite`, `attestation`, `disabled`, `statut`) VALUES
('0007', 'Lekina', 'Florent', 'M', NULL, 'lekinaflorent@gmail.com', 'Tsinga, Yaounde', '6184351857', NULL, 1, '17/01/2000 00:00:00', '9002001', NULL, NULL, NULL, NULL, 2),
('0044XDEl27', 'Atangana', 'Joseph', 'M', NULL, 'jjatango', 'Yaoundé, Cameroun', '647482229', NULL, NULL, '01/01/2047 00:00:00', '9002002', NULL, NULL, NULL, NULL, 3),
('01728', 'Atangana', 'Christian', 'M', '17/07/1967 00:00:00', 'atchris@ao.org', 'Sous-manguier, Yaounde', '647297070', NULL, 1, 'Invalid Date', '9002002', NULL, NULL, NULL, NULL, 3),
('01729', 'Ketcha Courtes', 'Celestine', 'F', NULL, 'ketchacelest@ao-alliance.org', 'Manguier, Carrefour Beignets', '649571812', NULL, NULL, NULL, '9002003', 17, NULL, NULL, NULL, 3),
('04545', 'Tamo', 'Christian', 'F', '12/11/1993 00:00:00', 'tamo17@gmail.com', 'Hopital du district, Messa', '645591757', NULL, 1, '20/07/2020 00:00:00', '9002002', NULL, NULL, NULL, NULL, 2),
('04717', 'SANDI', 'Vincent Appolinaire', 'M', NULL, 'sndivi@gmail.com', 'Source Fouda, Messassi', '655244570', NULL, NULL, NULL, '9002002', 20, NULL, NULL, NULL, 2),
('0484950', 'Ebenezer', 'Bertrand', 'M', NULL, 'benezer@gmail.com', '17eme rue, Bastos, Hotel Grand Moulin', '647282931', NULL, NULL, NULL, '9002002', 20, NULL, NULL, NULL, 3),
('cdf', 'Nguén', 'Anne', 'M', NULL, 'annekevinanguen091@gmail.com', 'Source Fouda, Messassi', '655244570', NULL, NULL, NULL, '9002002', 14, NULL, NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `organisme`
--

DROP TABLE IF EXISTS `organisme`;
CREATE TABLE IF NOT EXISTS `organisme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `adresse_mail` varchar(100) DEFAULT NULL,
  `site_web` varchar(200) DEFAULT NULL,
  `localisation` varchar(200) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `logo` varchar(50) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `type_organisme` char(7) DEFAULT NULL,
  `siege` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `designation` (`designation`),
  KEY `fk_organisme_siege1` (`siege`) USING BTREE,
  KEY `fk_type_organisme` (`type_organisme`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `organisme`
--

INSERT INTO `organisme` (`id`, `code`, `designation`, `description`, `adresse_mail`, `site_web`, `localisation`, `telephone`, `logo`, `adresse`, `type_organisme`, `siege`) VALUES
(1, 'ORGFS001', 'Polyclinique de Tsinga', NULL, NULL, NULL, '1.3658Z3.856475L0.192718l', NULL, NULL, 'Tsinga, à côté du supermaché MAX', '8002100', 1),
(2, 'ORGRST001', 'AO Alliance', 'Organisation à but non lucratif dont le but est de ', NULL, 'https://ao-alliance.org/', NULL, NULL, NULL, 'Clavadelerstrasse 8, 7270 Davos, Switzerland', '8002002', NULL),
(3, 'ORGOMS', 'OMS', 'Organisation Mondiale de la Santé', NULL, 'https://www.who.int/', NULL, NULL, NULL, NULL, '8002001', NULL),
(4, 'ORGFOK', 'Société Fokou', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '8002201', 1),
(5, 'ORGFSHCY', 'Hopital Central de Yaounde', NULL, NULL, NULL, '', NULL, NULL, 'Mokolo, près de la Fondation Chantal Biya', '8002100', 1),
(6, 'ORGFSPY1', 'Polyclinique Anne-Marie Nkoulou', NULL, NULL, NULL, '', NULL, NULL, 'Hotel de ville, derriere la CNPS', '8002100', 1),
(7, 'ORGRST002', 'AO Trauma', '', NULL, 'https://ao-trauma.org/', NULL, NULL, NULL, '', '8002002', NULL),
(8, 'ORGRST003', 'SIGN Fracture Care International', '', NULL, 'https://sign-fracture-care.org/', NULL, NULL, NULL, '', '8002002', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `organisme_medecin`
--

DROP TABLE IF EXISTS `organisme_medecin`;
CREATE TABLE IF NOT EXISTS `organisme_medecin` (
  `organisme` int(11) NOT NULL,
  `medecin` varchar(11) NOT NULL,
  `date_entree` varchar(100) DEFAULT NULL,
  `date_sortie` varchar(100) DEFAULT NULL,
  `attestation` varchar(150) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1,
  UNIQUE KEY `pk_org_med` (`organisme`,`medecin`),
  KEY `fk_medecin` (`medecin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='dateEntrée = date_fonction (fs) et date_adhesion(rs_trt)';

--
-- Dumping data for table `organisme_medecin`
--

INSERT INTO `organisme_medecin` (`organisme`, `medecin`, `date_entree`, `date_sortie`, `attestation`, `actif`) VALUES
(1, '0007', NULL, NULL, NULL, 1),
(1, '01728', NULL, NULL, NULL, 1),
(1, '04545', NULL, NULL, NULL, 1),
(2, '0007', NULL, NULL, NULL, 1),
(2, '0044XDEl27', NULL, NULL, NULL, 1),
(2, '01728', NULL, NULL, NULL, 1),
(2, '04545', NULL, NULL, NULL, 1),
(2, 'cdf', NULL, NULL, NULL, 1),
(5, '0007', NULL, NULL, NULL, 1),
(5, '01729', NULL, NULL, NULL, 1),
(6, '0007', NULL, NULL, NULL, 1),
(6, '0044XDEl27', NULL, NULL, NULL, 1),
(6, '04545', NULL, NULL, NULL, 1),
(6, 'cdf', NULL, NULL, NULL, 1),
(7, '0007', NULL, NULL, NULL, 1),
(7, '0044XDEl27', NULL, NULL, NULL, 1),
(7, '0484950', NULL, NULL, NULL, 1),
(8, '0007', NULL, NULL, NULL, 1),
(8, '01729', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `sexe` varchar(1) DEFAULT NULL,
  `date_naissance` varchar(50) DEFAULT NULL,
  `Adresse` varchar(200) DEFAULT NULL,
  `adresse_mail` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `nationalite` int(11) DEFAULT NULL,
  `religion` char(7) DEFAULT NULL,
  `profession` char(7) DEFAULT NULL,
  `nom_urgence` varchar(150) DEFAULT NULL,
  `telephone_urgence` varchar(11) DEFAULT NULL,
  `identite` varchar(50) DEFAULT NULL,
  `attestation` varchar(50) DEFAULT NULL,
  `enregistrer_par` int(11) DEFAULT NULL,
  `statut` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_patient_pays1` (`nationalite`),
  KEY `fk_religion` (`religion`),
  KEY `fk_profession` (`profession`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `nom`, `prenom`, `sexe`, `date_naissance`, `Adresse`, `adresse_mail`, `telephone`, `nationalite`, `religion`, `profession`, `nom_urgence`, `telephone_urgence`, `identite`, `attestation`, `enregistrer_par`, `statut`) VALUES
(9, 'Emana', 'Fleury Joseph', 'M', '28/12/2007 00:00:00', NULL, 'nganoufleu@gmail.com', '654260107', 1, '9000003', '9001002', 'Emmanuel Nganou', '661822850', NULL, NULL, NULL, 0),
(10, 'Nguén', 'Anne', 'F', '25/06/2023 11:52:34', NULL, 'annekevinanguen091@gmail.com', '655244570', NULL, NULL, NULL, 'Anne Nguén', '655244570', NULL, NULL, NULL, 0),
(11, 'Nguén', 'Anne', 'M', '17/03/1998 00:00:00', NULL, 'sigjes@gmail.com', '64557580960', 1, '9000003', '9001001', 'Anne Nguén', '655244570', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pays`
--

DROP TABLE IF EXISTS `pays`;
CREATE TABLE IF NOT EXISTS `pays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `designation` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `continent` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `continent` (`continent`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `pays`
--

INSERT INTO `pays` (`id`, `code`, `designation`, `description`, `continent`) VALUES
(1, 'CMR', 'Cameroun', NULL, 10000),
(2, 'GBN', 'Gabon', NULL, 10000);

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
CREATE TABLE IF NOT EXISTS `region` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `pays` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pays` (`pays`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`id`, `code`, `designation`, `description`, `pays`) VALUES
(1, 'REGCEN', 'Centre', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rubrique`
--

DROP TABLE IF EXISTS `rubrique`;
CREATE TABLE IF NOT EXISTS `rubrique` (
  `id` char(4) NOT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `type_multiple` tinyint(1) DEFAULT NULL,
  `domaine` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_domaine` (`domaine`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `rubrique`
--

INSERT INTO `rubrique` (`id`, `designation`, `description`, `type_multiple`, `domaine`) VALUES
('0000', 'Inconnu', NULL, 0, NULL),
('0003', 'Type d\'accident', NULL, 0, 15),
('0004', 'Mécanismes ayant causé le traumatisme', NULL, 1, 15),
('0005', 'Premiers soins par', NULL, 1, 4),
('0006', 'Délai d\'arrivée à la FS', NULL, 0, 4),
('0007', 'Moyen de transport vers la FS', NULL, 0, 4),
('0010', 'Géneral', NULL, 0, 7),
('0011', 'Appareil locomoteur', NULL, 0, 7),
('0012', 'Système nerveux central et périphérique', NULL, 0, 7),
('0013', 'Enquête appareil respiratoire', NULL, 0, 7),
('0014', 'Enquête appareil cardio-vasculaire', NULL, 0, 7),
('0015', 'Enquête appareil digestif', NULL, 0, 7),
('0016', 'Enquête appareil uro-génital', NULL, 0, 7),
('0020', 'Examen géneral / Extremité céphalique  ', NULL, 1, 8),
('0021', 'Luxation clinique de', NULL, 1, 8),
('0022', 'Fracture clinique de ', NULL, 1, 8),
('0023', 'Type de fracture ', NULL, 1, 8),
('0024', 'Type de fracture pédiatrique ', NULL, 1, 8),
('0025', 'Coloration périphérique du membre ', NULL, 0, 8),
('0026', 'Pouls périphériques ', NULL, 0, 8),
('0027', 'Température du membre', NULL, 0, 8),
('0028', 'Sensibilité', NULL, 0, 8),
('0029', 'Examen radiographies initiales', NULL, 1, 8),
('0030', 'Examen appareil digestif', NULL, 0, 8),
('0031', 'Examen appareil urogenital', NULL, 0, 8),
('0032', 'Examen appareil cardio-vasculaire', NULL, 0, 8),
('0033', 'Examen neurologique', NULL, 0, 8),
('0040', 'Statut clinique', NULL, 0, 12),
('0041', 'Décision therapeutique', NULL, 0, 12),
('1000', 'Traumatisme avec douleurs localisées', NULL, 0, 15),
('1001', 'Impotence fonctionnelle', NULL, 0, 15),
('1003', 'Date du traumatisme', NULL, 0, 4),
('1004', 'TA', NULL, 0, 8),
('1005', 'Pouls', NULL, 0, 8),
('1006', 'FR', NULL, 0, 8),
('1007', 'T', 'Température', 0, 8),
('1008', 'Classification AO', '', 0, 10),
('1009', 'Lessions associées 1', '', 0, 10),
('1010', 'Lessions associées 2', '', 0, 10),
('1011', 'Lessions associées 3', '', 0, 10),
('2000', 'GCS', 'Glasgow Coma Score', 0, 11),
('2001', 'ISS', 'Injury Severity Score', 0, 11),
('8000', 'Type de documents', NULL, 0, NULL),
('8001', 'Type de formation sanitaire', NULL, 0, NULL),
('8002', 'Type d\'organisme', NULL, 0, NULL),
('8003', 'Type rubrique', NULL, 0, NULL),
('9000', 'Religion', NULL, 0, NULL),
('9001', 'Profession', NULL, 0, NULL),
('9002', 'Qualification', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `enabled` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `password_2` (`password`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `enabled`) VALUES
('4', 'mechlianne@30', '$2b$12$lejpLJHyN64Qpv1m6oxwmeSdWZ5oJ44E6oMxMIKUq1Pbv04ZqvCxW', 4, 1),
('6', 'mon roi', '$2b$12$ssVFe4VkhtL8CdYk0GPWcOPqbglxKCNkn2y/JFr8Mh3WvShzTDUd2', 4, 1),
('5', 'mechlianne', '$2b$12$qMWE1sFmC1PvxurKzdXO3u96EC6Xx4XdWmIRts6dwEL.LiVZpURcS', 4, 1),
('ftveeffvvsf', '78n6ngAn', '9gn69nn8ng', 2, 0),
('4EE4444X440', 'eunnNgéu', 'n2@7n50943', 2, 0),
('0D4D4XD04XD', 'neéneuén', 'n7@nu@é5n6', 2, 0),
('004E44DDDX0', 'néuNénng', '8N@é4uN4n7', 2, 0),
('0004044D404', 'enueééuA', '09ué377n30', 2, 0),
('00DDD404444', 'éééNenuu', '6960éé29n2', 2, 0),
('0D4D4040D40', 'nnneunuA', 'n@n5237An0', 2, 0),
('DD00D40D400', 'gngnNngé', '5éngégéé6@', 2, 0),
('40455555054', 'siaTmmon', 'n9ms@nn8an', 2, 0),
('00077000000', 'LelFlnel', '613eF9L99n', 2, 0),
('04017007107', 'iSInlAan', '1ll5@n0n1n', 2, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arrondissement`
--
ALTER TABLE `arrondissement`
  ADD CONSTRAINT `fk_arrondissement_departement1` FOREIGN KEY (`departement`) REFERENCES `departement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `fk_client_organisme1` FOREIGN KEY (`organisme`) REFERENCES `organisme` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_client_pays1` FOREIGN KEY (`nationalite`) REFERENCES `pays` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `demande`
--
ALTER TABLE `demande`
  ADD CONSTRAINT `fk_personne` FOREIGN KEY (`personne`) REFERENCES `medecin` (`id`);

--
-- Constraints for table `departement`
--
ALTER TABLE `departement`
  ADD CONSTRAINT `region` FOREIGN KEY (`region`) REFERENCES `region` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dossier`
--
ALTER TABLE `dossier`
  ADD CONSTRAINT `fk_fs` FOREIGN KEY (`formation_sanitaire`) REFERENCES `organisme` (`id`),
  ADD CONSTRAINT `fk_patient` FOREIGN KEY (`patient`) REFERENCES `patient` (`id`);

--
-- Constraints for table `elt_rubrique`
--
ALTER TABLE `elt_rubrique`
  ADD CONSTRAINT `fk_rubrique` FOREIGN KEY (`rubrique`) REFERENCES `rubrique` (`id`);

--
-- Constraints for table `medecin`
--
ALTER TABLE `medecin`
  ADD CONSTRAINT `fk_medecin_pays` FOREIGN KEY (`nationalite`) REFERENCES `pays` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_qualification` FOREIGN KEY (`qualification`) REFERENCES `elt_rubrique` (`id`);

--
-- Constraints for table `organisme`
--
ALTER TABLE `organisme`
  ADD CONSTRAINT `fk_organisme_region1` FOREIGN KEY (`siege`) REFERENCES `region` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_type_organisme` FOREIGN KEY (`type_organisme`) REFERENCES `elt_rubrique` (`id`);

--
-- Constraints for table `organisme_medecin`
--
ALTER TABLE `organisme_medecin`
  ADD CONSTRAINT `fk_medecin` FOREIGN KEY (`medecin`) REFERENCES `medecin` (`id`),
  ADD CONSTRAINT `fk_organisme` FOREIGN KEY (`organisme`) REFERENCES `organisme` (`id`);

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `fk_patient_pays1` FOREIGN KEY (`nationalite`) REFERENCES `pays` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_profession` FOREIGN KEY (`profession`) REFERENCES `elt_rubrique` (`id`),
  ADD CONSTRAINT `fk_religion` FOREIGN KEY (`religion`) REFERENCES `elt_rubrique` (`id`);

--
-- Constraints for table `pays`
--
ALTER TABLE `pays`
  ADD CONSTRAINT `continent` FOREIGN KEY (`continent`) REFERENCES `continent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `region`
--
ALTER TABLE `region`
  ADD CONSTRAINT `fk_pays` FOREIGN KEY (`pays`) REFERENCES `pays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rubrique`
--
ALTER TABLE `rubrique`
  ADD CONSTRAINT `fk_domaine` FOREIGN KEY (`domaine`) REFERENCES `domaine` (`id`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
