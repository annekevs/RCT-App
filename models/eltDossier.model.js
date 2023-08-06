const DBoperation = require("../database/dboperation");

class EltDossierModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "elt_dossier";
    this.ELTDOSSIER_DOSSIER = "id";
    this.ELTDOSSIER_RUBRIQUE = "rubrique";
    this.ELTDOSSIER_VALEUR = "valeur";
    this.ELTDOSSIER_UPDATE = "date_update";
    this.ELTDOSSIER_DISABLED = "disabled";
    
    this.TABLE_CREATE = ``;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      ELTDOSSIER_DOSSIER: this.ELTDOSSIER_DOSSIER,
      ELTDOSSIER_RUBRIQUE: this.ELTDOSSIER_RUBRIQUE,
      ELTDOSSIER_VALEUR: this.ELTDOSSIER_VALEUR,
      ELTDOSSIER_UPDATE: this.ELTDOSSIER_UPDATE,
      ELTDOSSIER_DISABLED: this.ELTDOSSIER_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      ELTDOSSIER_DOSSIER: this.ELTDOSSIER_DOSSIER + "_l",
      ELTDOSSIER_RUBRIQUE: this.ELTDOSSIER_RUBRIQUE + "_l",
      ELTDOSSIER_VALEUR: this.ELTDOSSIER_VALEUR + "_l",
      ELTDOSSIER_DATE_SORTIE: this.ELTDOSSIER_DATE_SORTIE + "_l",
      ELTDOSSIER_STATUT: this.ELTDOSSIER_STATUT + "_l",
      ELTDOSSIER_TRANSFERT: this.ELTDOSSIER_TRANSFERT + "_l",
      ELTDOSSIER_NB_TRANSFERT: this.ELTDOSSIER_NB_TRANSFERT + "_l",
      ELTDOSSIER_PUFFER: this.ELTDOSSIER_PUFFER + "_l",
      ELTDOSSIER_NB_PUFFER: this.ELTDOSSIER_NB_PUFFER + "_l",
      ELTDOSSIER_FS: this.ELTDOSSIER_FS + "_l",
      ELTDOSSIER_VISIBILITE: this.ELTDOSSIER_VISIBILITE + "_l",
      ELTDOSSIER_UPDATE: this.ELTDOSSIER_UPDATE + "_l",
      ELTDOSSIER_ENREGISTRER_PAR: this.ELTDOSSIER_ENREGISTRER_PAR + "_l",
      ELTDOSSIER_DISABLED: this.ELTDOSSIER_DISABLED + "_l",
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

module.exports = EltDossierModel;
