const DBoperation = require("../database/dboperation");

class DemandeModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "demande";
    this.DEMANDE_ID = "id"; // combinaison entre
    this.DEMANDE_PERSONNE = "personne";
    this.DEMANDE_DATE_ENVOIE = "date_envoie";
    this.DEMANDE_DATE_REPONSE = "date_reception";
    this.DEMANDE_STATUT = "statut";
    this.DEMANDE_TYPE = "type_demande";

    this.TABLE_CREATE = ``;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      DEMANDE_ID: this.DEMANDE_ID,
      DEMANDE_PERSONNE: this.DEMANDE_PERSONNE,
      DEMANDE_DATE_ENVOIE: this.DEMANDE_DATE_ENVOIE,
      DEMANDE_DATE_REPONSE: this.DEMANDE_DATE_REPONSE,
      DEMANDE_STATUT: this.DEMANDE_STATUT,
      DEMANDE_TYPE: this.DEMANDE_TYPE,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      DEMANDE_ID: this.DEMANDE_ID + "_l",
      DEMANDE_PERSONNE: this.DEMANDE_PERSONNE + "_l",
      DEMANDE_DATE_ENVOIE: this.DEMANDE_DATE_ENVOIE + "_l",
      DEMANDE_DATE_REPONSE: this.DEMANDE_DATE_REPONSE + "_l",
      DEMANDE_STATUT: this.DEMANDE_STATUT + "_l",
      DEMANDE_TYPE: this.DEMANDE_TYPE + "_l",
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

module.exports = DemandeModel;
