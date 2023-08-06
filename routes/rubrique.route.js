const express = require("express");
const { AppDAO } = require("../database/dbconnection");
const RubriqueModel = require("../models/domaines/rubrique.model");
const EltRubriqueModel = require("../models/domaines/eltRubrique.model");
const ModelCtrl = require("../controllers/domaines/model.controller");

const router = express.Router();

const dao = new AppDAO();

// ============= RUBRIQUE ====================
const daoRubriques = new RubriqueModel(dao);
const ctrlRubrique = new ModelCtrl("rubrique", daoRubriques);
router.get("/rubrique", ctrlRubrique.getAll);
router.post("/rubrique", ctrlRubrique.create);
router.get("/rubrique/:id", ctrlRubrique.getOne);
router.put("/rubrique/:id", ctrlRubrique.update);
router.delete("/rubrique/:id", ctrlRubrique.delete);

// ============= ELT_RUBRIQUE ====================
const daoEltRubriques = new EltRubriqueModel(dao);
const ctrlEltRubrique = new ModelCtrl("eltRubrique", daoEltRubriques);
router.get("/eltRubrique", ctrlEltRubrique.getAll);
router.post("/eltRubrique", ctrlEltRubrique.create);
router.get("/eltRubrique/:id", ctrlEltRubrique.getOne);
router.put("/eltRubrique/:id", ctrlEltRubrique.update);
router.delete("/eltRubrique/:id", ctrlEltRubrique.delete);

module.exports = router;
