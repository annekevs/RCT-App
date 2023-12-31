const DBoperation = require("../database/dboperation");

class UserModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "compte";
    this.USER_ID = "id";
    this.USER_MAIL = "email";
    this.USER_PWD = "password";
    this.USER_ROLE = "role";
    this.USER_ACTIVATED = "isActivated";

    // requête pour la création de la table
    this.TABLE_CREATE = ` CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
            ${this.USER_ID} INTEGER PRIMARY KEY AUTO_INCREMENT,
            ${this.USER_MAIL} TEXT,
            ${this.USER_PWD} TEXT,
            ${this.USER_ROLE} TEXT,
            ${this.USER_ACTIVATED} INT DEFAULT 0
        )`;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      USER_ID: this.USER_ID,
      USER_MAIL: this.USER_MAIL,
      USER_PWD: this.USER_PWD,
      USER_ROLE: this.USER_ROLE,
      USER_ACTIVATED: this.USER_ACTIVATED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      USER_ID: this.USER_ID + "_l",
      USER_MAIL: this.USER_MAIL + "_l",
      USER_PWD: this.USER_PWD + "_l",
      USER_ROLE: this.USER_ROLE + "_l",
      USER_ACTIVATED: this.USER_ACTIVATED + "_l",
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

module.exports = UserModel;
