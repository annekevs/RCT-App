const DBoperation = require("../database/dboperation");

class PatientModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "patient";
    this.PATIENT_ID = "id";
    this.PATIENT_NOM = "nom";
    this.PATIENT_PRENOM = "prenom";
    this.PATIENT_SEXE = "sexe";
    this.PATIENT_NIU = "niu";
    this.PATIENT_DATE_NAISS = "date_naissance";
    this.PATIENT_ADRESSE = "adresse";
    this.PATIENT_MAIL = "adresse_mail";
    this.PATIENT_PHONE = "telephone";
    this.PATIENT_NATION = "nationalite";
    this.PATIENT_RELIGION = "religion";
    this.PATIENT_PROFESSION = "profession";
    this.PATIENT_EMERGENCY_NAME = "nom_urgence";
    this.PATIENT_EMERGENCY_PHONE = "telephone_urgence";
    this.PATIENT_IDENTITE = "identite";
    this.PATIENT_ENREGISTRER_PAR = "enregistrer_par";
    this.PATIENT_STATUS = "statut";

    this.TABLE_CREATE = ``;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      PATIENT_ID: this.PATIENT_ID,
      PATIENT_NOM: this.PATIENT_NOM,
      PATIENT_PRENOM: this.PATIENT_PRENOM,
      PATIENT_SEXE: this.PATIENT_SEXE,
      PATIENT_NIU: this.PATIENT_NIU,
      PATIENT_DATE_NAISS: this.PATIENT_DATE_NAISS,
      PATIENT_ADRESSE: this.PATIENT_ADRESSE,
      PATIENT_MAIL: this.PATIENT_MAIL,
      PATIENT_PHONE: this.PATIENT_PHONE,
      PATIENT_NATION: this.PATIENT_NATION,
      PATIENT_RELIGION: this.PATIENT_RELIGION,
      PATIENT_PROFESSION: this.PATIENT_PROFESSION,
      PATIENT_EMERGENCY_NAME: this.PATIENT_EMERGENCY_NAME,
      PATIENT_EMERGENCY_PHONE: this.PATIENT_EMERGENCY_PHONE,
      PATIENT_IDENTITE: this.PATIENT_IDENTITE,
      PATIENT_ENREGISTRER_PAR: this.PATIENT_ENREGISTRER_PAR,
      PATIENT_STATUS: this.PATIENT_STATUS,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      PATIENT_ID: this.PATIENT_ID + "_l",
      PATIENT_NOM: this.PATIENT_NOM + "_l",
      PATIENT_PRENOM: this.PATIENT_PRENOM + "_l",
      PATIENT_SEXE: this.PATIENT_SEXE + "_l",
      PATIENT_NIU: this.PATIENT_NIU + "_l",
      PATIENT_DATE_NAISS: this.PATIENT_DATE_NAISS + "_l",
      PATIENT_ADRESSE: this.PATIENT_ADRESSE,
      PATIENT_MAIL: this.PATIENT_MAIL + "_l",
      PATIENT_PHONE: this.PATIENT_PHONE + "_l",
      PATIENT_NATION: this.PATIENT_NATION + "_l",
      PATIENT_RELIGION: this.PATIENT_RELIGION + "_l",
      PATIENT_PROFESSION: this.PATIENT_PROFESSION + "_l",
      PATIENT_EMERGENCY_NAME: this.PATIENT_EMERGENCY_NAME + "_l",
      PATIENT_EMERGENCY_PHONE: this.PATIENT_EMERGENCY_PHONE + "_l",
      PATIENT_IDENTITE: this.PATIENT_IDENTITE + "_l",
      PATIENT_ENREGISTRER_PAR: this.PATIENT_ENREGISTRER_PAR + "_l",
      PATIENT_STATUS: this.PATIENT_STATUS + "_l",
    };
  }

  /**
   * creer les operations pour la table User
   * @returns {*DBoperation}
   */
  exec() {
    return new DBoperation(
      this.dao,
      this.TABLE_NAME,
      this.TABLE_CREATE,
      this.getModelFields,
      this.getlikeFields
    );
  }
}

module.exports = PatientModel;
