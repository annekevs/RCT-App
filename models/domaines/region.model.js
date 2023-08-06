const DBoperation = require("../../database/dboperation");

class RegionModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "region";
    this.REGION_ID = "id";
    this.REGION_CODE = "code";
    this.REGION_LIBL = "designation";
    this.REGION_DESC = "description";
    this.REGION_ENABLED = "enabled";

    // requête pour la création de la table
    this.TABLE_CREATE = ` CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
            ${this.REGION_ID} INTEGER PRIMARY KEY AUTO_INCREMENT,
            ${this.REGION_CODE} TEXT,
            ${this.REGION_LIBL} TEXT,
            ${this.REGION_DESC} TEXT,
            ${this.REGION_ENABLED} INT DEFAULT 0
        )`;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      REGION_ID: this.REGION_ID,
      REGION_CODE: this.REGION_CODE,
      REGION_LIBL: this.REGION_LIBL,
      REGION_DESC: this.REGION_DESC,
      REGION_ENABLED: this.REGION_ENABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      REGION_ID: this.REGION_ID + "_l",
      REGION_CODE: this.REGION_CODE + "_l",
      REGION_LIBL: this.REGION_LIBL + "_l",
      REGION_DESC: this.REGION_DESC + "_l",
      REGION_ENABLED: this.REGION_ENABLED + "_l",
    };
  }

  /**
   * creer les operations pour la table Region
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

module.exports = RegionModel;
