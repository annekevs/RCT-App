const { dao, AppDAO } = require("../database/dbconnection");
const ModelCtrl = require("../controllers/domaines/model.controller");
const OrgMedModel = require("../models/organismeMedecin.model");
const OrganismeModel = require("../models/organisme.model");
const MedecinModel = require("../models/medecin.model");
const UserModel = require("../models/user.model");
const DemandeModel = require("../models/demande.model");
const DossierModel = require("../models/dossier.model");
const MailService = require("../services/Emailling");
const { generateString, encryptUserID } = require("../services/Generative");
const { INFO_DEMANDES } = require("../utils/constants");
const { CODE_RUBRIQUES } = require("../utils/rubriques");

// const dao = new AppDAO();
const daoOrganisme = new OrganismeModel(dao);
const daoOrgMed = new OrgMedModel(dao);
const daoMedecin = new MedecinModel(dao);
const daoDemandes = new DemandeModel(dao);
const daoDossiers = new DossierModel(dao);

const createMedecin = async (req, res) => {
  const { medecin, organismes } = req.body;
  // console.log("data received ", req.body);
  await daoMedecin
    .exec()
    .save(medecin)
    .then(async (data) => {
      for (let org in organismes) {
        if (organismes[org]) {
          await daoOrgMed
            .exec()
            .save({
              organisme: organismes[org],
              medecin: medecin.id,
            })
            .catch((error) => {
              throw error;
            });
        }
      }
      // creé la demande associée à l'utilisateur
      await daoDemandes
        .exec()
        .save({
          personne: medecin.id,
          date_envoie: new Date().toLocaleString(),
          type_demande: INFO_DEMANDES.type.adhesion.valeur,
        })
        .then(async (demandeData) => {
          console.log("la demande d'enregistrement a bien été effectuée");
          //envoie du mail d'accusé de reception de la demande au médecin
          const infoUser = {
            nom: medecin.nom,
            prenom: medecin.prenom,
            userID: medecin.id,
            mail: medecin.adresse_mail,
          };
          const welcomeMailData = MailService.mailInfo(infoUser).welcome;
          MailService.sendMail(
            medecin.adresse_mail,
            welcomeMailData.subject,
            welcomeMailData.message
          )
            .then(() => {
              console.log("welcome mail sent successfully");
            })
            .catch((err) => {
              console.log("an error occured while sending the mail ", err);
              throw err;
            });
        })
        .catch((err) => {
          console.log(
            "erreur lors de l'enregistrement de la demande d'adhésion"
          );
          throw err;
        });

      res.status(200).json({
        success: true,
        message: "Medecin créé avec succes",
        result: { insertId: medecin.id },
      });
    })
    .catch((err) => {
      console.log("error while creating medecin ", err);
      daoMedecin.exec().delete({ id: medecin.id });
      res.status(500).json({
        success: false,
        message: "Impossible de creer le medecin [erreur interne]",
        result: err.text,
      });
    });
};

const getOneMedecin = async (req, res) => {
  const id = req.params.id;
  await daoMedecin
    .exec()
    .find({ id: id }, null, "1")
    .then(async (result) => {
      // recuperer les organismes d'affiliations du médecin
      await daoOrgMed
        .exec()
        .find({ medecin: id }, null, null)
        .then(async (organismes) => {
          // liste des orgMed
          console.log("liste des organismes ", organismes);
          const medecin = new Object(result);
          medecin.organismes = [];
          for (let ind in organismes) {
            // await daoOrganisme
            //   .exec()
            //   .find({ id: organismes[ind].organisme }, null, "1")
            //   .then((org) => {
            //     // console.log("organisme getted ", org);
            //     let organisme = new Object(org);
            //     organisme.date_entree = organismes[ind].date_entree;
            //     organisme.date_sortie = organismes[ind].date_sortie;
            //     organisme.attestation = organismes[ind].attestation;
            //     organisme.actif = organismes[ind].actif;
            //     medecin.organismes.push(organisme);
            //   })
            //   .catch((err) => {
            //     // console.log("get one medecin error ", err);
            //     throw err;
            //   });
            medecin.organismes[ind] = organismes[ind].organisme;
          }
          res.status(200).json({
            success: true,
            message: "Medecin recuperé avec succès",
            result: medecin,
          });
        });
    })
    .catch((err) => {
      console.log("get one medecin error ", err);
      res.status(500).json({
        success: false,
        message:
          "Impossible de recupere l'utilisateur : ce medecin n'existe pas",
        result: null,
      });
    });
};

const _getOneMedecin = async (id) => {
  return await daoMedecin
    .exec()
    .find({ id: id }, null, "1")
    .then(async (result) => {
      const medecin = new Object(result);
      // get quantities of medical record for this physician
      return await daoDossiers
        .exec()
        .find({ praticien: id }, null, null)
        .then(async (dossiers) => {
          medecin.dossiers = dossiers;
          // recuperer les organismes d'affiliations du médecin
          return await daoOrgMed
            .exec()
            .find({ medecin: id }, null, null)
            .then(async (organismes) => {
              medecin.organismes = [];
              for (let ind in organismes) {
                medecin.organismes[ind] = organismes[ind].organisme;
              }
              return medecin;
            });
        });
    })
    .catch((err) => {
      // console.log("get one medecin error ", err);
      throw err;
    });
};

const getAllMedecin = async (req, res) => {
  const medecins = [];
  await daoMedecin
    .exec()
    .find()
    .then(async (rows) => {
      for (let ind in rows) {
        await _getOneMedecin(rows[ind].id)
          .then((data) => {
            medecins[ind] = data;
          })
          .catch((err) => {
            throw err;
          });
      }
      res.status(200).json({
        success: true,
        message: "Medecins recuperés avec succès",
        result: medecins,
      });
    })
    .catch((err) => {
      // console.log("get all medecins error ", err);
      res.status(500).json({
        success: false,
        message: "Impossible de recuperer les medecins",
        result: err,
      });
    });
};

module.exports = {
  createMedecin,
  getOneMedecin,
  _getOneMedecin,
  getAllMedecin,
};
