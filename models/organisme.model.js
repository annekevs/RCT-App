const DBoperation = require("../database/dboperation");

class Organisme {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "organisme";
    this.ORG_ID = "id";
    this.ORG_CODE = "code";
    this.ORG_LIBL = "designation";
    this.ORG_DESC = "description";
    this.ORG_MAIL = "adresse_mail";
    this.ORG_WEB = "site_web";
    this.ORG_GEO = "localisation";
    this.ORG_PHONE = "telephone";
    this.ORG_LOGO = "logo";
    this.ORG_ADRESSE = "adresse";
    this.ORG_TYPE = "type_organisme";
    this.ORG_SIEGE = "siege";

    this.TABLE_CREATE = ``;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      ORG_ID: this.ORG_ID,
      ORG_CODE: this.ORG_CODE,
      ORG_LIBL: this.ORG_LIBL,
      ORG_DESC: this.ORG_DESC,
      ORG_MAIL: this.ORG_MAIL,
      ORG_WEB: this.ORG_WEB,
      ORG_GEO: this.ORG_GEO,
      ORG_PHONE: this.ORG_PHONE,
      ORG_LOGO: this.ORG_LOGO,
      ORG_ADRESSE: this.ORG_ADRESSE,
      ORG_TYPE: this.ORG_TYPE,
      ORG_SIEGE: this.ORG_SIEGE,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      ORG_ID: this.ORG_ID + "_l",
      ORG_CODE: this.ORG_CODE + "_l",
      ORG_LIBL: this.ORG_LIBL + "_l",
      ORG_DESC: this.ORG_DESC + "_l",
      ORG_MAIL: this.ORG_MAIL + "_l",
      ORG_WEB: this.ORG_WEB + "_l",
      ORG_GEO: this.ORG_GEO + "_l",
      ORG_PHONE: this.ORG_PHONE + "_l",
      ORG_LOGO: this.ORG_LOGO + "_l",
      ORG_ADRESSE: this.ORG_ADRESSE + "_l",
      ORG_TYPE: this.ORG_TYPE + "_l",
      ORG_SIEGE: this.ORG_SIEGE + "_l",
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

module.exports = Organisme;
