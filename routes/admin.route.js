const express = require("express");
const userController = require("../controllers/user.controller");
const authMid = require("../middlewares/auth");
const MedecinModel = require("../models/medecin.model");
const OrgMedModel = require("../models/organismeMedecin.model");
const ModelCtrl = require("../controllers/domaines/model.controller");
const { AppDAO } = require("../database/dbconnection");
const {
  createMedecin,
  getOneMedecin,
  getAllMedecin,
} = require("../controllers/medecin.controller");

const router = express.Router();

const dao = new AppDAO();

// get user
router.get("/user", userController.getAllUser);

// create user
router.post("/user", userController.createUser);

// get one user
router.get("/user/:id", userController.getOneUser);

// update user
router.put("/user/:id", userController.updateUser);

// delete user
router.delete("/user/:id", userController.deleteUser);

// ============= MEDECIN ====================
const daoMedecins = new MedecinModel(dao);
const ctrlMedecin = new ModelCtrl("medecin", daoMedecins);
// router.get("/medecin", ctrlMedecin.getAll);
router.get("/medecin", getAllMedecin);
// router.post("/medecin", ctrlMedecin.create);
router.post("/medecin", createMedecin);
// router.get("/medecin/:id", ctrlMedecin.getOne);
router.get("/medecin/:id", getOneMedecin);
router.put("/medecin/:id", ctrlMedecin.update);
router.delete("/medecin/:id", ctrlMedecin.delete);

// ============= ORGANISME MEDECIN ====================
const daoOrgMed = new OrgMedModel(dao);
const ctrlOrgMed = new ModelCtrl("organisme-medecin", daoOrgMed);
router.get("/org-med", ctrlOrgMed.getAll);
router.post("/org-med", ctrlOrgMed.create);
// router.get("/org-med/:id", ctrlOrgMed.getOne);
router.put("/org-med/:id", ctrlOrgMed.update);
router.delete("/org-med/:id", ctrlOrgMed.delete);

module.exports = router;
