const { dao, AppDAO } = require("../database/dbconnection");
const UserModel = require("../models/user.model");
const DemandeModel = require("../models/demande.model");
const MedecinModel = require("../models/medecin.model");
const { _getOneMedecin } = require("../controllers/medecin.controller");
const MailService = require("../services/Emailling");
const { generateString, encryptUserID } = require("../services/Generative");
const { INFO_DEMANDES, USER_ROLES } = require("../utils/constants");

// const dao = new AppDAO();
const daoUsers = new UserModel(dao);
const daoDemandes = new DemandeModel(dao);
const daoMedecin = new MedecinModel(dao);

const getOneDemande = async (req, res) => {
  const id = req.params.id;
  await daoDemandes
    .exec()
    .find({ id: id }, null, "1")
    .then(async (row) => {
      await _getOneMedecin(row.personne)
        .then((medrow) => {
          console.log("doctor : ", medrow);
          row.personne = medrow;
          res.status(200).json({
            success: true,
            message: "Demande recuperée avec succes",
            result: row,
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Impossible de recuperé les demandes",
        result: err,
      });
    });
};

const getAllDemande = async (req, res) => {
  const id = req.params.id;
  await daoDemandes
    .exec()
    .find()
    .then(async (rows) => {
      for (let ind in rows) {
        await _getOneMedecin(rows[ind].personne)
          .then((medrow) => {
            console.log("doctor : ", medrow);
            rows[ind].personne = medrow;
          })
          .catch((err) => {
            throw err;
          });
      }
      res.status(200).json({
        success: true,
        message: "Demandes recuperées avec succes",
        result: rows,
      });
    });
};

// la demande a été acceptée
const acceptDemande = async (req, res) => {
  const { demandeID, medecin, motif } = req.body;
  // generer les identifiants par défaut pour le nouvel utilisateur
  const gen_username = generateString(8, medecin.nom + medecin.prenom);
  const gen_password = generateString(10, gen_username + "@1234567890");
  console.log(
    "username generated for medecin : ",
    gen_username,
    gen_password,
    encryptUserID(medecin.id)
  );
  // creer le nouvel utilisateur
  daoUsers
    .exec()
    .save({
      id: encryptUserID(medecin.id),
      username: gen_username,
      password: gen_password,
      role: USER_ROLES.praticien,
    })
    .then(async (result) => {
      // changer le statut du medecin
      daoMedecin
        .exec()
        .update(
          {
            statut: INFO_DEMANDES.statut.accepte.valeur,
          },
          { id: medecin.id }
        )
        .then(() => {
          console.log("medecin activé");
          // changer le statut de la demande en_attente --> acceptée
          daoDemandes.exec().update(
            {
              statut: INFO_DEMANDES.statut.accepte.valeur,
              info: motif,
              date_reponse: new Date().toLocaleDateString(),
            },
            { id: demandeID }
          );
        })
        .catch((err) => {
          throw err;
        });

      console.log("l'utilisateur medecin crée avec succes");
      //envoie du mail au médecin pour acceptation de sa demande
      const infoUser = {
        nom: medecin.nom,
        prenom: medecin.prenom,
        userID: medecin.id,
        username: gen_username,
        password: gen_password,
        mail: medecin.adresse_mail,
      };
      const acceptMailData = MailService.mailInfo(infoUser).accept;
      MailService.sendMail(
        medecin.adresse_mail,
        acceptMailData.subject,
        acceptMailData.message
      )
        .then(() => {
          console.log("accept request mail sent successfully");
        })
        .catch((err) => {
          console.log("an error occured while sending the mail ", err);
          throw err;
        });
      res.status(200).json({
        success: true,
        message: "La demande d'adhésion a été acceptée",
        result: null,
      });
    })
    .catch((err) => {
      console.log("impossible de créer le nouvel utilisateur ", err);
      res.statut(500).json({
        success: false,
        message: "Impossible d'accepter la demande [erreur interne]",
        result: err.text,
      });
    });
};

const rejetDemande = async (req, res) => {
  const { demandeID, medecin, motif } = req.body;
  console.log(req.body);
  // mettre à jour le statut de la demande
  daoDemandes
    .exec()
    .update(
      {
        statut: INFO_DEMANDES.statut.rejete.valeur,
        info: motif,
        date_reponse: new Date().toLocaleDateString(),
      },
      { id: demandeID }
    )
    .then(async () => {
      // mettre à jour le statut du medecin
      await daoMedecin
        .exec()
        .update(
          { statut: INFO_DEMANDES.statut.rejete.valeur },
          { id: medecin.id }
        );
      //envoie du mail au médecin pour rejet de sa demande
      const infoUser = {
        nom: medecin.nom,
        prenom: medecin.prenom,
        userID: medecin.id,
        mail: medecin.adresse_mail,
        motif: motif,
      };
      const rejetMailData = MailService.mailInfo(infoUser).rejet;
      MailService.sendMail(
        medecin.adresse_mail,
        rejetMailData.subject,
        rejetMailData.message
      )
        .then(() => {
          console.log("reject request mail sent successfully");
        })
        .catch((err) => {
          console.log("an error occured while sending the mail ", err);
          throw err;
        });

      res.status(200).json({
        success: true,
        message: "La demande d'adhésion a été refusée",
        result: null,
      });
    })
    .catch((err) => {
      console.log("impossible de refuser la demande ", err);
      res.statut(500).json({
        success: false,
        message: "Impossible de refuser la demande [erreur interne]",
        result: err.text,
      });
    });
};

module.exports = { getOneDemande, getAllDemande, acceptDemande, rejetDemande };
