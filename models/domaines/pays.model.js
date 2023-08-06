const DBoperation = require("../../database/dboperation");

class PaysModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "pays";
    this.PAYS_ID = "id";
    this.PAYS_CODE = "code";
    this.PAYS_LIBL = "designation";
    this.PAYS_DESC = "description";
    this.PAYS_CONT = "continent";
    this.PAYS_DISABLED = "disabled";
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      PAYS_ID: this.PAYS_ID,
      PAYS_CODE: this.PAYS_CODE,
      PAYS_LIBL: this.PAYS_LIBL,
      PAYS_DESC: this.PAYS_DESC,
      PAYS_CONT: this.PAYS_CONT,
      PAYS_DISABLED: this.PAYS_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      PAYS_ID: this.PAYS_ID + "_l",
      PAYS_CODE: this.PAYS_CODE + "_l",
      PAYS_LIBL: this.PAYS_LIBL + "_l",
      PAYS_DESC: this.PAYS_DESC + "_l",
      PAYS_CONT: this.PAYS_CONT + "_l",
      PAYS_DISABLED: this.PAYS_DISABLED + "_l",
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

module.exports = PaysModel;
