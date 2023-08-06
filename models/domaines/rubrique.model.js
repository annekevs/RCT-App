const DBoperation = require("../../database/dboperation");

class RubriqueModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "rubrique";
    this.RUBRIQUE_CODE = "code";
    this.RUBRIQUE_LIBL = "designation";
    this.RUBRIQUE_DESC = "description";
    this.RUBRIQUE_MASTER = "rubrique_master";
    this.RUBRIQUE_TYPE = "type_multiple";
    this.RUBRIQUE_DOMAINE = "domaine";
    this.RUBRIQUE_DISABLED = "disabled";
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      // RUBRIQUE_ID: this.RUBRIQUE_ID,
      RUBRIQUE_CODE: this.RUBRIQUE_CODE,
      RUBRIQUE_LIBL: this.RUBRIQUE_LIBL,
      RUBRIQUE_DESC: this.RUBRIQUE_DESC,
      RUBRIQUE_MASTER: this.RUBRIQUE_MASTER,
      RUBRIQUE_TYPE: this.RUBRIQUE_TYPE,
      RUBRIQUE_DOMAINE: this.RUBRIQUE_DOMAINE,
      RUBRIQUE_DISABLED: this.RUBRIQUE_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      // RUBRIQUE_ID: this.RUBRIQUE_ID + "_l",
      RUBRIQUE_CODE: this.RUBRIQUE_CODE + "_l",
      RUBRIQUE_LIBL: this.RUBRIQUE_LIBL + "_l",
      RUBRIQUE_DESC: this.RUBRIQUE_DESC + "_l",
      RUBRIQUE_MASTER: this.RUBRIQUE_MASTER + "_l",
      RUBRIQUE_TYPE: this.RUBRIQUE_TYPE + "_l",
      RUBRIQUE_DOMAINE: this.RUBRIQUE_DOMAINE + "_l",
      RUBRIQUE_DISABLED: this.RUBRIQUE_DISABLED + "_l",
    };
  }

  /**
   * creer les operations pour la table pays
   * @returns {*DBoperation}
   */
  exec() {
    return new DBoperation(
      this.dao,
      this.TABLE_NAME,
      null,
      this.getModelFields,
      this.getlikeFields
    );
  }
}

module.exports = RubriqueModel;
