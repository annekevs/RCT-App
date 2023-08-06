const DossierModel = require("../models/dossier.model");
const { dao, AppDAO } = require("../database/dbconnection");
const PatientModel = require("../models/patient.model");
const EltDossierModel = require("../models/eltDossier.model");
const ModelCtrl = require("../controllers/domaines/model.controller");
const OrgMedModel = require("../models/organismeMedecin.model");

// const dao = new AppDAO();
const daoDossiers = new DossierModel(dao);
const daoEltDossiers = new EltDossierModel(dao);
const daoPatients = new PatientModel(dao);
const ctrlEltDossier = new ModelCtrl("elt_dossier", daoEltDossiers);

// ========== ORGANISME -- MEDECIN ===============
const daoOrgMed = new OrgMedModel(dao);
const ctrlOrgMed = new ModelCtrl("organisme_medecin", daoOrgMed);

const createOrgMed = async (req, res) => {
  const { organismes, medecin } = req.body;
  for (let org in organismes) {
    await ctrlOrgMed
      .create({
        organisme: org,
        medecin: medecin,
      })
      .catch((error) => {
        throw error;
      });
  }
};

const getAllDossier = async (req, res) => {
  const dataObject = req.query ? req.query : [];
  const order = req.query.order ? req.query.order : null;
  const limit = req.query.limit ? req.query.limit : null;
  console.log("get all params ", dataObject, order, limit);
  await daoDossiers
    .exec()
    .find(dataObject, order, limit)
    .then(async (result) => {
      if (result) {
        let dossiers = [];
        for (let index = 0; index < result.length; index++) {
          dossiers[index] = await _getOneDossier(result[index].id);
        }
        res.status(200).json({
          success: true,
          message: "",
          result: dossiers,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "",
        result: error.text,
      });
    });
};

const updateDossier = async (req, res) => {
  console.log("all elt sent are there : ", req.body);
  const eltDossiers = req.body;
  for (let ind in eltDossiers) {
    // console.log("ind in first for loop ", ind, eltDossiers[ind]);
    if (eltDossiers[ind].valeur.length) {
      var newElt = { ...eltDossiers[ind] };
      for (let index in eltDossiers[ind].valeur) {
        newElt.valeur = eltDossiers[ind].valeur[index]
          ? eltDossiers[ind].valeur[index]
          : "0000000";

        await daoEltDossiers
          .exec()
          .save(newElt)
          .then((elt) => {
            // console.log("eltdossier adding ", elt);
          })
          .catch((error) => {
            throw error;
            // res.status(400).json({
            //   success: false,
            //   message: "dossier update failed...",
            //   result: error.text,
            // });
          });
      }
    } else {
      await daoEltDossiers
        .exec()
        .save(eltDossiers[ind])
        .then((elt) => {
          console.log("eltdossier adding ", elt);
        })
        .catch((error) => {
          throw error;
        });
    }
  }
  res.status(200).json({
    success: true,
    message: "dossier updated successfully",
    result: {},
  });
};

module.exports = { createOrgMed };
