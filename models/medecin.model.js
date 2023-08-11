const DBoperation = require("../database/dboperation");

class MedecinModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "medecin";
    this.MEDECIN_ID = "id";
    this.MEDECIN_NOM = "nom";
    this.MEDECIN_PRENOM = "prenom";
    this.MEDECIN_SEXE = "sexe";
    this.MEDECIN_DATE_NAISS = "date_naissance";
    this.MEDECIN_MAIL = "email";
    this.MEDECIN_ADRESSE = "adresse";
    this.MEDECIN_PHONE = "telephone";
    this.MEDECIN_NATION = "nationalite";
    this.MEDECIN_TYPE = "religion";
    this.MEDECIN_QUALIFICATION = "profession";
    this.MEDECIN_DATE_FONCTION = "profession_parent";
    this.MEDECIN_ATTESTATION = "telephone_parent";
    this.MEDECIN_IDENTITE = "identite";
    this.MEDECIN_ENREGISTRER_PAR = "enregistrer_par";
    this.MEDECIN_ACTIF = "actif";
    this.MEDECIN_DISABLED = "supprimer";

    this.TABLE_CREATE = ``;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      MEDECIN_ID: this.MEDECIN_ID,
      MEDECIN_NOM: this.MEDECIN_NOM,
      MEDECIN_PRENOM: this.MEDECIN_PRENOM,
      MEDECIN_SEXE: this.MEDECIN_SEXE,
      MEDECIN_DATE_NAISS: this.MEDECIN_DATE_NAISS,
      MEDECIN_MAIL: this.MEDECIN_MAIL,
      MEDECIN_ADRESSE: this.MEDECIN_ADRESSE,
      MEDECIN_PHONE: this.MEDECIN_PHONE,
      MEDECIN_NATION: this.MEDECIN_NATION,
      MEDECIN_TYPE: this.MEDECIN_TYPE,
      MEDECIN_QUALIFICATION: this.MEDECIN_QUALIFICATION,
      MEDECIN_DATE_FONCTION: this.MEDECIN_DATE_FONCTION,
      MEDECIN_ATTESTATION: this.MEDECIN_ATTESTATION,
      MEDECIN_IDENTITE: this.MEDECIN_IDENTITE,
      MEDECIN_ENREGISTRER_PAR: this.MEDECIN_ENREGISTRER_PAR,
      MEDECIN_ACTIF: this.MEDECIN_ACTIF,
      MEDECIN_DISABLED: this.MEDECIN_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      MEDECIN_ID: this.MEDECIN_ID + "_l",
      MEDECIN_NOM: this.MEDECIN_NOM + "_l",
      MEDECIN_PRENOM: this.MEDECIN_PRENOM + "_l",
      MEDECIN_SEXE: this.MEDECIN_SEXE + "_l",
      MEDECIN_DATE_NAISS: this.MEDECIN_DATE_NAISS + "_l",
      MEDECIN_MAIL: this.MEDECIN_MAIL + "_l",
      MEDECIN_ADRESSE: this.MEDECIN_ADRESSE + "_l",
      MEDECIN_PHONE: this.MEDECIN_PHONE + "_l",
      MEDECIN_NATION: this.MEDECIN_NATION + "_l",
      MEDECIN_TYPE: this.MEDECIN_TYPE + "_l",
      MEDECIN_QUALIFICATION: this.MEDECIN_QUALIFICATION + "_l",
      MEDECIN_DATE_FONCTION: this.MEDECIN_DATE_FONCTION + "_l",
      MEDECIN_ATTESTATION: this.MEDECIN_ATTESTATION + "_l",
      MEDECIN_IDENTITE: this.MEDECIN_IDENTITE + "_l",
      MEDECIN_ENREGISTRER_PAR: this.MEDECIN_ENREGISTRER_PAR + "_l",
      MEDECIN_DISABLED: this.MEDECIN_DISABLED + "_l",
      MEDECIN_ACTIF: this.MEDECIN_ACTIF + "_l",
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

module.exports = MedecinModel;
