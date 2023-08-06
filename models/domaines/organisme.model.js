const DBoperation = require("../../database/dboperation");

class OrganismeModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "organisme";
    this.ELT_ORGANISME_CODE = "code";
    this.ELT_ORGANISME_LIBL = "designation";
    this.ELT_ORGANISME_DESC = "description";
    this.ELT_ORGANISME_MAIL = "adresse_mail";
    this.ELT_ORGANISME_SITE = "site_web";
    this.ELT_ORGANISME_GEO = "localisation";
    this.ELT_ORGANISME_PHONE = "telephone";
    this.ELT_ORGANISME_LOGO = "logo";
    this.ELT_ORGANISME_ADRESSE = "adresse";
    this.ELT_ORGANISME_TYPE = "type_organisme";
    this.ELT_ORGANISME_SIEGE = "siege";
    this.ELT_ORGANISME_DISABLED = "disabled";
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      ELT_ORGANISME_CODE: this.ELT_ORGANISME_CODE,
      ELT_ORGANISME_LIBL: this.ELT_ORGANISME_LIBL,
      ELT_ORGANISME_DESC: this.ELT_ORGANISME_DESC,
      ELT_ORGANISME_MAIL: this.ELT_ORGANISME_MAIL,
      ELT_ORGANISME_SITE: this.ELT_ORGANISME_SITE,
      ELT_ORGANISME_GEO: this.ELT_ORGANISME_GEO,
      ELT_ORGANISME_PHONE: this.ELT_ORGANISME_PHONE,
      ELT_ORGANISME_LOGO: this.ELT_ORGANISME_LOGO,
      ELT_ORGANISME_ADRESSE: this.ELT_ORGANISME_ADRESSE,
      ELT_ORGANISME_TYPE: this.ELT_ORGANISME_TYPE,
      ELT_ORGANISME_SIEGE: this.ELT_ORGANISME_SIEGE,
      ELT_ORGANISME_DISABLED: this.ELT_ORGANISME_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      ELT_ORGANISME_CODE: this.ELT_ORGANISME_CODE + "_l",
      ELT_ORGANISME_LIBL: this.ELT_ORGANISME_LIBL + "_l",
      ELT_ORGANISME_DESC: this.ELT_ORGANISME_DESC + "_l",
      ELT_ORGANISME_MAIL: this.ELT_ORGANISME_MAIL + "_l",
      ELT_ORGANISME_SITE: this.ELT_ORGANISME_SITE + "_l",
      ELT_ORGANISME_GEO: this.ELT_ORGANISME_GEO + "_l",
      ELT_ORGANISME_PHONE: this.ELT_ORGANISME_PHONE + "_l",
      ELT_ORGANISME_LOGO: this.ELT_ORGANISME_LOGO + "_l",
      ELT_ORGANISME_ADRESSE: this.ELT_ORGANISME_ADRESSE + "_l",
      ELT_ORGANISME_TYPE: this.ELT_ORGANISME_TYPE + "_l",
      ELT_ORGANISME_SIEGE: this.ELT_ORGANISME_SIEGE + "_l",
      ELT_ORGANISME_DISABLED: this.ELT_ORGANISME_DISABLED + "_l",
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

module.exports = OrganismeModel;
