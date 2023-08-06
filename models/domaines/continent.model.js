const DBoperation = require("../../database/dboperation");

class ContinentModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "continent";
    this.CONTINENT_ID = "id";
    this.CONTINENT_CODE = "code";
    this.CONTINENT_LIBL = "designation";
    this.CONTINENT_DESC = "description";
    this.CONTINENT_DISABLED = "enabled";
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      CONTINENT_ID: this.CONTINENT_ID,
      CONTINENT_CODE: this.CONTINENT_CODE,
      CONTINENT_LIBL: this.CONTINENT_LIBL,
      CONTINENT_DESC: this.CONTINENT_DESC,
      CONTINENT_DISABLED: this.CONTINENT_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      CONTINENT_ID: this.CONTINENT_ID + "_l",
      CONTINENT_CODE: this.CONTINENT_CODE + "_l",
      CONTINENT_LIBL: this.CONTINENT_LIBL + "_l",
      CONTINENT_DESC: this.CONTINENT_DESC + "_l",
      CONTINENT_DISABLED: this.CONTINENT_DISABLED + "_l",
    };
  }

  /**
   * creer les operations pour la table continent
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

module.exports = ContinentModel;
