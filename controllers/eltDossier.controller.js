const { dao, AppDAO } = require("../database/dbconnection");
const PatientModel = require("../models/patient.model");
const EltDossierModel = require("../models/eltDossier.model");
const EltRubriqueModel = require("../models/domaines/eltRubrique.model");
const ModelCtrl = require("../controllers/domaines/model.controller");

// const dao = new AppDAO();
const daoEltDossier = new EltDossierModel(dao);
const daoEltRubrique = new EltRubriqueModel(dao);
const daoPatients = new PatientModel(dao);
const ctrlEltDossier = new ModelCtrl("elt_dossier", daoEltDossier);

// ========== DOSSIER ===============
const _getOneEltDossier = async (id) => {
  return await daoEltDossier
    .exec()
    .find({ dossier: id }, null, "1")
    .then(async (eltDossier) => {
      if (eltDossier.valeur.length === 7) {
        return await daoEltRubrique
          .exec()
          .find({ id: eltDossier.valeur }, null, "1")
          .then((eltRub) => {
            eltDossier.valeur = eltRub;
            return eltDossier;
          });
      } else {
        return eltDossier;
      }
    });
};

const getOneEltDossier = async (req, res) => {
  return await daoEltDossier
    .exec()
    .find({ dossier: req.params.id }, null, "1")
    .then(async (eltDossier) => {
      if (eltDossier?.valeur.length === 7) {
        return await daoEltRubrique
          .exec()
          .find({ id: eltDossier.valeur }, null, "1")
          .then((eltRub) => {
            eltDossier.valeur = eltRub;
            res.status(200).json({
              success: true,
              message: "",
              result: eltDossier,
            });
          })
          .catch((error) => {
            res.status(400).json({
              success: false,
              message: "",
              result: error.text,
            });
          });
      } else {
        res.status(200).json({
          success: true,
          message: "",
          result: eltDossier,
        });
      }
    });
};

module.exports = { getOneEltDossier };
