// GESTION DES DEMANDES D'ADHESION ET DE STATISTIQUES
const express = require("express");
const { AppDAO } = require("../database/dbconnection");
const authMid = require("../middlewares/auth");
const DemandeModel = require("../models/demande.model");
const ModelCtrl = require("../controllers/domaines/model.controller");
const {
  acceptDemande,
  rejetDemande,
  getOneDemande,
  getAllDemande,
} = require("../controllers/demande.controller");

const router = express.Router();

const dao = new AppDAO();
const daoDemandes = new DemandeModel(dao);
const demandeCtrl = new ModelCtrl("demandes", daoDemandes);

// router.get("/adhesion", demandeCtrl.getAll);
router.get("/adhesion", getAllDemande);
router.post("/adhesion", demandeCtrl.create);
router.post("/adhesion/accept", acceptDemande);
router.post("/adhesion/rejet", rejetDemande);
// router.get("/adhesion/:id", demandeCtrl.getOne);
router.get("/adhesion/:id", getOneDemande);
router.put("/adhesion/:id", demandeCtrl.update);
router.delete("/adhesion/:id", demandeCtrl.delete);

module.exports = router;
