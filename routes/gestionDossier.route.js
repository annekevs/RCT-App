const express = require("express");
const { AppDAO } = require("../database/dbconnection");
const PatientModel = require("../models/patient.model");
const MedecinModel = require("../models/medecin.model");
const DossierModel = require("../models/dossier.model");
const EltDossierModel = require("../models/eltDossier.model");
const ModelCtrl = require("../controllers/domaines/model.controller");
const getPatient = require("../controllers/patient.controller");
const {
  updateDossier,
  completeDossier,
  getDossierOne,
  getDossierAll,
} = require("../controllers/dossier.controller");
const { getOneEltDossier } = require("../controllers/eltDossier.controller");

const router = express.Router();

const dao = new AppDAO();

// ============= MEDECIN ====================
const daoMedecins = new MedecinModel(dao);
const ctrlMedecin = new ModelCtrl("medecin", daoMedecins);
router.get("/medecin", ctrlMedecin.getAll);
router.post("/medecin", ctrlMedecin.create);
router.get("/medecin/:id", ctrlMedecin.getOne);
router.put("/medecin/:id", ctrlMedecin.update);
router.delete("/medecin/:id", ctrlMedecin.delete);

// ============= PATIENT ====================
const daoPatients = new PatientModel(dao);
const ctrlPatient = new ModelCtrl("patient", daoPatients);
// router.get("/patient", ctrlPatient.getAll);
router.get("/patient", getPatient.getPatientAll);
router.post("/patient", ctrlPatient.create);
// router.get("/patient/:id", ctrlPatient.getOne);
router.get("/patient/:id", getPatient.getPatientOne);
// router.get("/patient/:id", getPatient);
router.put("/patient/:id", ctrlPatient.update);
router.delete("/patient/:id", ctrlPatient.delete);

// ============= DOSSIER ====================
const daoDossiers = new DossierModel(dao);
const ctrlDossier = new ModelCtrl("dossier", daoDossiers);
// router.get("/dossier", ctrlDossier.getAll);
router.get("/dossier", getDossierAll);
router.post("/dossier", ctrlDossier.create);
router.post("/dossier/complete", completeDossier); // remplir le dossier en creant ses elts du dossier
router.get("/dossier/:id", getDossierOne);
// router.put("/dossier/:id", ctrlDossier.update);
router.put("/dossier/:id", updateDossier);
router.delete("/dossier/:id", ctrlDossier.delete);

// ============= ELT_DOSSIER ====================
const daoEltDossiers = new EltDossierModel(dao);
const ctrlEltDossier = new ModelCtrl("eltDossier", daoEltDossiers);
router.get("/eltDossier", ctrlEltDossier.getAll);
router.post("/eltDossier", ctrlEltDossier.create);
router.get("/eltDossier/:id", getOneEltDossier);
// router.get("/eltDossier/:id", getOneEltDossier);
router.put("/eltDossier/:id", ctrlEltDossier.update);
router.delete("/eltDossier/:id", ctrlEltDossier.delete);

module.exports = router;
