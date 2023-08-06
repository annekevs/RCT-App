const DBoperation = require("../database/dboperation");

class OrganismeMedecin {
  //dao {AppDAO} Pool de connexion à la base de données
  constructor(dao) {
    this.dao = dao;

    this.TABLE_NAME = "organisme_medecin";
    this.ORGMED_ORGANISME = "organisme";
    this.ORGMED_MEDECIN = "medecin";
    this.ORGMED_ENTREE = "dateEntree";
    this.ORGMED_SORTIE = "dateSortie";
    this.ORGMED_ATTESTATION = "attestation";
    this.ORGMED_DISABLED = "actif";

    this.TABLE_CREATE = ``;
  }

  // recuperer les champs de la table
  getModelFields() {
    return {
      ORGMED_ORGANISME: this.ORGMED_ORGANISME,
      ORGMED_MEDECIN: this.ORGMED_MEDECIN,
      ORGMED_ENTREE: this.ORGMED_ENTREE,
      ORGMED_SORTIE: this.ORGMED_SORTIE,
      ORGMED_ATTESTATION: this.ORGMED_ATTESTATION,
      ORGMED_DISABLED: this.ORGMED_DISABLED,
    };
  }

  // recupere les champs de la table pour les requetes avec LIKE
  getlikeFields() {
    return {
      ORGMED_ORGANISME: this.ORGMED_ORGANISME + "_l",
      ORGMED_MEDECIN: this.ORGMED_MEDECIN + "_l",
      ORGMED_ENTREE: this.ORGMED_ENTREE + "_l",
      ELTDOSSIER_DATE_SORTIE: this.ELTDOSSIER_DATE_SORTIE + "_l",
      ELTDOSSIER_STATUT: this.ELTDOSSIER_STATUT + "_l",
      ELTDOSSIER_TRANSFERT: this.ELTDOSSIER_TRANSFERT + "_l",
      ELTDOSSIER_NB_TRANSFERT: this.ELTDOSSIER_NB_TRANSFERT + "_l",
      ELTDOSSIER_PUFFER: this.ELTDOSSIER_PUFFER + "_l",
      ELTDOSSIER_NB_PUFFER: this.ELTDOSSIER_NB_PUFFER + "_l",
      ELTDOSSIER_FS: this.ELTDOSSIER_FS + "_l",
      ELTDOSSIER_VISIBILITE: this.ELTDOSSIER_VISIBILITE + "_l",
      ORGMED_SORTIE: this.ORGMED_SORTIE + "_l",
      ELTDOSSIER_ENREGISTRER_PAR: this.ELTDOSSIER_ENREGISTRER_PAR + "_l",
      ORGMED_ATTESTATION: this.ORGMED_ATTESTATION + "_l",
      ORGMED_DISABLED: this.ORGMED_DISABLED,
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

module.exports = OrganismeMedecin;
