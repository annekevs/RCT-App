const DBoperation = require("../database/dboperation");

class DossierModel {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "dossier";
    this.DOSSIER_ID = "id";
    this.DOSSIER_PATIENT = "patient";
    this.DOSSIER_DATE_ENTREE = "dateEntree";
    this.DOSSIER_DATE_SORTIE = "dateSortie";
    this.DOSSIER_STATUT = "statut";
    this.DOSSIER_TRANSFERT = "transfert";
    this.DOSSIER_NB_TRANSFERT = "transfertNb";
    this.DOSSIER_PUFFER = "puffer";
    this.DOSSIER_NB_PUFFER = "pufferNb";
    this.DOSSIER_FS = "formation_sanitaire";
    this.DOSSIER_VISIBILITE = "visibilite";
    this.DOSSIER_UPDATE = "lastUpdate";
    this.DOSSIER_OWNER = "enregistrer_par";
    this.DOSSIER_DISABLED = "disabled";
    this.DOSSIER_STEP = "step";
    this.DOSSIER_PRATICIEN = "praticien";
    this.DOSSIER_LAST = "last";
    this.DOSSIER_D_ENREG = "date_enregistrement";
    this.DOSSIER_D_TRAUMA = "date_traumatisme";
    this.DOSSIER_MODE = "mode";

    this.TABLE_CREATE = ``;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      DOSSIER_ID: this.DOSSIER_ID,
      DOSSIER_PATIENT: this.DOSSIER_PATIENT,
      DOSSIER_DATE_ENTREE: this.DOSSIER_DATE_ENTREE,
      DOSSIER_DATE_SORTIE: this.DOSSIER_DATE_SORTIE,
      DOSSIER_STATUT: this.DOSSIER_STATUT,
      DOSSIER_TRANSFERT: this.DOSSIER_TRANSFERT,
      DOSSIER_NB_TRANSFERT: this.DOSSIER_NB_TRANSFERT,
      DOSSIER_PUFFER: this.DOSSIER_PUFFER,
      DOSSIER_NB_PUFFER: this.DOSSIER_NB_PUFFER,
      DOSSIER_FS: this.DOSSIER_FS,
      DOSSIER_VISIBILITE: this.DOSSIER_VISIBILITE,
      DOSSIER_UPDATE: this.DOSSIER_UPDATE,
      DOSSIER_OWNER: this.DOSSIER_OWNER,
      DOSSSIER_D_ENREG: this.DOSSSIER_D_ENREG,
      DOSSSIER_STEP: this.DOSSSIER_STEP,
      DOSSSIER_D_TRAUMA: this.DOSSSIER_D_TRAUMA,
      DOSSSIER_LAST: this.DOSSSIER_LAST,
      DOSSSIER_MODE: this.DOSSSIER_MODE,
      DOSSSIER_PRATICIEN: this.DOSSSIER_PRATICIEN,
      DOSSIER_DISABLED: this.DOSSIER_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      DOSSIER_ID: this.DOSSIER_ID + "_l",
      DOSSIER_PATIENT: this.DOSSIER_PATIENT + "_l",
      DOSSIER_DATE_ENTREE: this.DOSSIER_DATE_ENTREE + "_l",
      DOSSIER_DATE_SORTIE: this.DOSSIER_DATE_SORTIE + "_l",
      DOSSIER_STATUT: this.DOSSIER_STATUT + "_l",
      DOSSIER_TRANSFERT: this.DOSSIER_TRANSFERT + "_l",
      DOSSIER_NB_TRANSFERT: this.DOSSIER_NB_TRANSFERT + "_l",
      DOSSIER_PUFFER: this.DOSSIER_PUFFER + "_l",
      DOSSIER_NB_PUFFER: this.DOSSIER_NB_PUFFER + "_l",
      DOSSIER_FS: this.DOSSIER_FS + "_l",
      DOSSIER_VISIBILITE: this.DOSSIER_VISIBILITE + "_l",
      DOSSIER_UPDATE: this.DOSSIER_UPDATE + "_l",
      DOSSIER_OWNER: this.DOSSIER_OWNER + "_l",
      DOSSSIER_D_ENREG: this.DOSSSIER_D_ENREG + "_l",
      DOSSSIER_STEP: this.DOSSSIER_STEP + "_l",
      DOSSSIER_D_TRAUMA: this.DOSSSIER_D_TRAUMA + "_l",
      DOSSSIER_LAST: this.DOSSSIER_LAST + "_l",
      DOSSSIER_MODE: this.DOSSSIER_MODE + "_l",
      DOSSSIER_PRATICIEN: this.DOSSSIER_PRATICIEN + "_l",
      DOSSIER_DISABLED: this.DOSSIER_DISABLED + "_l",
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

module.exports = DossierModel;
