const PatientModel = require("../models/patient.model");
const { dao, AppDAO } = require("../database/dbconnection");
const DossierModel = require("../models/dossier.model");
const MedecinModel = require("../models/medecin.model");
const OrganismeModel = require("../models/organisme.model");

// const dao = new AppDAO();
const daoPatients = new PatientModel(dao);
const daoDossiers = new DossierModel(dao);
const daoMedecins = new MedecinModel(dao);
const daoOrganismes = new OrganismeModel(dao);

// ========== PATIENT ===============
const getPatientOne = async (req, res) => {
  await daoPatients
    .exec()
    .find({ id: req.params.id }, null, "1")
    .then(async (patient) => {
      console.log("un patient recuperé ", patient);
      await daoDossiers
        .exec()
        .find()
        .then((dossiers) => {
          patient.dossiers = dossiers;
          const lastDossier = dossiers.find((dos) => dos.last === 1);
          if (lastDossier) {
            patient.statut = lastDossier.statut;
            patient.formation_sanitaire = lastDossier.formation_sanitaire;
            patient.mode = lastDossier.mode;
            patient.praticien = lastDossier.praticien;
            patient.dossier_id = lastDossier.id;
            patient.nb_dossiers = dossiers.length;
          }
          res.status(200).json({
            success: true,
            message: "",
            result: patient,
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "",
        result: err,
      });
    });
};

const getPatientAll = async (req, res) => {
  await daoPatients
    .exec()
    .find()
    .then(async (patients) => {
      for (let ind in patients) {
        const patient = patients[ind];
        // get dossiers
        await daoDossiers
          .exec()
          .find({ patient: patient.id })
          .then(async (dossiers) => {
            patient.dossiers = dossiers;
            const lastDossier = dossiers.find((dos) => dos.last === 1);
            if (lastDossier) {
              // le patient a au moins un dossier
              patient.statut = lastDossier.statut;
              patient.mode = lastDossier.mode;
              patient.dossier_id = lastDossier.id;
              patient.nb_dossiers = dossiers.length;

              // get praticien data
              patient.praticien = await daoMedecins
                .exec()
                .find({ id: lastDossier.praticien }, null, "1")
                .then((medecin) => {
                  return medecin;
                })
                .catch((err) => {
                  throw err;
                });

              // get FS
              patient.formation_sanitaire = await daoOrganismes
                .exec()
                .find({ id: lastDossier.formation_sanitaire }, null, "1")
                .then((org) => {
                  return org;
                })
                .catch((err) => {
                  throw err;
                });
            } else {
              // le patient n'a aucun dossier a son actif
              patient.dossier_id = null;
              patient.nb_dossiers = 0;
              patient.formation_sanitaire = null;
              patient.praticien = null;
            }
          })
          .catch((err) => {
            throw err;
          });
      }
      res.status(200).json({
        success: true,
        message: "Liste des patients obtenus avec succès",
        result: patients,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Impossible de recuperer la liste des patients",
        result: err,
      });
    });
};

module.exports = { getPatientOne, getPatientAll };
