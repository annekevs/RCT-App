const DBoperation = require("../../database/dboperation");

class EltRubriqueModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "elt_rubrique";
    this.ELT_RUBRIQUE_CODE = "code";
    this.ELT_RUBRIQUE_LIBL = "designation";
    this.ELT_RUBRIQUE_DESC = "description";
    this.ELT_RUBRIQUE_MASTER = "rubrique";
    this.ELT_RUBRIQUE_DISABLED = "disabled";
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      ELT_RUBRIQUE_CODE: this.ELT_RUBRIQUE_CODE,
      ELT_RUBRIQUE_LIBL: this.ELT_RUBRIQUE_LIBL,
      ELT_RUBRIQUE_DESC: this.ELT_RUBRIQUE_DESC,
      ELT_RUBRIQUE_MASTER: this.ELT_RUBRIQUE_MASTER,
      ELT_RUBRIQUE_TYPE: this.ELT_RUBRIQUE_TYPE,
      ELT_RUBRIQUE_DISABLED: this.ELT_RUBRIQUE_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      ELT_RUBRIQUE_CODE: this.ELT_RUBRIQUE_CODE + "_l",
      ELT_RUBRIQUE_LIBL: this.ELT_RUBRIQUE_LIBL + "_l",
      ELT_RUBRIQUE_DESC: this.ELT_RUBRIQUE_DESC + "_l",
      ELT_RUBRIQUE_MASTER: this.ELT_RUBRIQUE_MASTER + "_l",
      ELT_RUBRIQUE_TYPE: this.ELT_RUBRIQUE_TYPE + "_l",
      ELT_RUBRIQUE_DISABLED: this.ELT_RUBRIQUE_DISABLED + "_l",
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

module.exports = EltRubriqueModel;
