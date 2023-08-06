const express = require("express");
const { AppDAO } = require("../database/dbconnection");
const ContinentModel = require("../models/domaines/continent.model");
const PaysModel = require("../models/domaines/pays.model");
const RegionModel = require("../models/domaines/region.model");
const RubriqueModel = require("../models/domaines/rubrique.model");
const EltRubriqueModel = require("../models/domaines/eltRubrique.model");
const OrganismeModel = require("../models/domaines/organisme.model");
const ModelCtrl = require("../controllers/domaines/model.controller");

const router = express.Router();

const dao = new AppDAO();

// ============= CONTINENT ====================
const daoContinents = new ContinentModel(dao);
const ctrlContinent = new ModelCtrl("continent", daoContinents);
router.get("/continent", ctrlContinent.getAll);
router.post("/continent", ctrlContinent.create);
router.get("/continent/:id", ctrlContinent.getOne);
router.put("/continent/:id", ctrlContinent.update);
router.delete("/continent/:id", ctrlContinent.delete);

// ============= CONTINENT ====================
const daoPays = new PaysModel(dao);
const ctrlPays = new ModelCtrl("pays", daoPays);
router.get("/pays", ctrlPays.getAll);
router.post("/pays", ctrlPays.create);
router.get("/pays/:id", ctrlPays.getOne);
router.put("/pays/:id", ctrlPays.update);
router.delete("/pays/:id", ctrlPays.delete);

// ============= PAYS ====================
const daoRegions = new RegionModel(dao);
const ctrlRegion = new ModelCtrl("region", daoRegions);
router.get("/region", ctrlRegion.getAll);
router.post("/region", ctrlRegion.create);
router.get("/region/:id", ctrlRegion.getOne);
router.put("/region/:id", ctrlRegion.update);
router.delete("/region/:id", ctrlRegion.delete);

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
const ctrlEltRubrique = new ModelCtrl("elt_rubrique", daoEltRubriques);
router.get("/eltRubrique", ctrlEltRubrique.getAll);
router.post("/eltRubrique", ctrlEltRubrique.create);
router.get("/eltRubrique/:id", ctrlEltRubrique.getOne);
router.put("/eltRubrique/:id", ctrlEltRubrique.update);
router.delete("/eltRubrique/:id", ctrlEltRubrique.delete);

// ============= ORGANISME ====================
const daoOrganisme = new OrganismeModel(dao);
const ctrlOrganisme = new ModelCtrl("organisme", daoOrganisme);
router.get("/organisme", ctrlOrganisme.getAll);
router.post("/organisme", ctrlOrganisme.create);
router.get("/organisme/:id", ctrlOrganisme.getOne);
router.put("/organisme/:id", ctrlOrganisme.update);
router.delete("/organisme/:id", ctrlOrganisme.delete);

module.exports = router;
