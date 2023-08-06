const DossierModel = require("../models/dossier.model");
const { dao, AppDAO } = require("../database/dbconnection");
const PatientModel = require("../models/patient.model");
const EltDossierModel = require("../models/eltDossier.model");
const MedecinModel = require("../models/medecin.model");
const OrganismeModel = require("../models/organisme.model");
const ModelCtrl = require("../controllers/domaines/model.controller");
const { _getOneMedecin } = require("../controllers/medecin.controller");

// const dao = new AppDAO();
const daoDossiers = new DossierModel(dao);
const daoEltDossiers = new EltDossierModel(dao);
const daoPatients = new PatientModel(dao);
const daoMedecins = new MedecinModel(dao);
const daoOrganismes = new OrganismeModel(dao);
const ctrlEltDossier = new ModelCtrl("elt_dossier", daoEltDossiers);

// ========== DOSSIER ===============

const updateDossier = async (req, res) => {
  console.log("all elt sent are there : ", req.body);
  const eltDossiers = req.body;
  try {
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
            .update(
              {
                valeur: newElt.valeur,
                date_update: new Date().toLocaleDateString(),
              },
              {
                dossier: newElt.dossier,
                rubrique: newElt.rubrique,
              }
            )
            .then((elt) => {
              // console.log("eltdossier updated ", elt);
            })
            .catch((error) => {
              throw error;
            });
        }
      } else {
        await daoEltDossiers
          .exec()
          .save(eltDossiers[ind])
          .then((elt) => {
            console.log("eltdossier updated ", elt);
          })
          .catch((error) => {
            throw error;
          });
      }
    }
    res.status(200).json({
      success: true,
      message: "Le dossier a été mis à jour",
      result: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Impossible de mettre à jour l'élement du dossier spécifier",
      result: error,
    });
  }
};

const completeDossier = async (req, res) => {
  // remplir un domaine du dossier et met à jour le statut de ce dossier au domaine completer
  console.log("all elt sent are there : ", req.body);
  const { eltDossiers, statut, dossierId, step, transfert, deces, puffer } =
    req.body;
  // remplit les champs du dossier
  try {
    for (let ind in eltDossiers) {
      // console.log("ind in first for loop ", ind, eltDossiers[ind]);
      if (eltDossiers[ind].valeur) {
        // si la valeur existe
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
              });
          }
        } else {
          await daoEltDossiers
            .exec()
            .save(eltDossiers[ind])
            .then((elt) => {
              console.log("one eltdossier added ", elt);
            })
            .catch((error) => {
              throw error;
            });
        }
      }
    }
    // set dossier statut
    await daoDossiers
      .exec()
      .update(
        {
          statut: statut,
          step: step,
          transfert: transfert ? transfert : 0,
          deces: deces ? deces : 0,
          puffer: puffer ? puffer : 0,
        },
        { id: dossierId }
      )
      .then((resData) => {
        console.log("statut dossier mis à jour avec succès");
      })
      .catch((err) => {
        throw err;
      });
    res.status(200).json({
      success: true,
      message: "L'element a bien été ajouté au dossier",
      result: {},
    });
  } catch (error) {
    console.log("error : ", error);
    // delete data we have just saved for maintening consistency
    try {
      for (let ind in eltDossiers) {
        // console.log("ind in first for loop ", ind, eltDossiers[ind]);
        if (eltDossiers[ind].valeur) {
          // si la valeur existe
          if (eltDossiers[ind].valeur.length) {
            var newElt = { ...eltDossiers[ind] };
            for (let index in eltDossiers[ind].valeur) {
              newElt.valeur = eltDossiers[ind].valeur[index]
                ? eltDossiers[ind].valeur[index]
                : "0000000";

              await daoEltDossiers
                .exec()
                .delete({ rubrique: eltDossiers[ind].rubrique })
                .then((elt) => {
                  // console.log("eltdossier adding ", elt);
                })
                .catch((error) => {
                  throw error;
                });
            }
          } else {
            await daoEltDossiers
              .exec()
              .delete({ rubrique: eltDossiers[ind].rubrique })
              .then((elt) => {
                console.log("one eltdossier added ", elt);
              })
              .catch((error) => {
                throw error;
              });
          }
        }
      }
    } catch (error) {
      console.log("unable to back to the start");
    }

    res.status(400).json({
      success: false,
      message: "Impossible d'ajouter l'élement au dossier",
      result: error,
    });
  }
};

const getDossierOne = async (req, res) => {
  await daoDossiers
    .exec()
    .find({ id: req.params.id }, null, "1")
    .then(async (row) => {
      // getPatient
      await daoPatients
        .exec()
        .find({ id: row.patient }, null, "1")
        .then((patient) => {
          row.patient = patient;
        })
        .catch((err) => {
          throw err;
        });
      // getPraticien
      await _getOneMedecin(row.praticien)
        .then(async (praticien) => {
          row.praticien = praticien;
        })
        .catch((err) => {
          throw err;
        });
      // get formation_sanitaire
      await daoOrganismes
        .exec()
        .find({ id: row.formation_sanitaire }, null, "1")
        .then(async (formation_sanitaire) => {
          row.formation_sanitaire = formation_sanitaire;
        })
        .catch((err) => {
          throw err;
        });

      // get tous les elements du dossier
      await daoEltDossiers
        .exec()
        .find({ dossier: req.params.id })
        .then((rows) => {
          row.payload = rows;
        })
        .catch((err) => {
          throw err;
        });
      res.status(200).json({
        success: true,
        message: "Liste des elements du dossier",
        result: row,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Impossible de récuperer les elements du dossier",
        result: null,
      });
    });
};

const getDossierAll = async (req, res) => {
  await daoDossiers
    .exec()
    .find()
    .then(async (dossiers) => {
      for (let ind in dossiers) {
        let row = dossiers[ind];
        // getPatient
        await daoPatients
          .exec()
          .find({ id: row.patient }, null, "1")
          .then(async (patient) => {
            row.patient = patient;
          })
          .catch((err) => {
            throw err;
          });
        // getPraticien
        await _getOneMedecin(row.praticien)
          .then(async (praticien) => {
            row.praticien = praticien;
          })
          .catch((err) => {
            throw err;
          });
        // get formation_sanitaire
        await daoOrganismes
          .exec()
          .find({ id: row.formation_sanitaire }, null, "1")
          .then(async (formation_sanitaire) => {
            row.formation_sanitaire = formation_sanitaire;
          })
          .catch((err) => {
            throw err;
          });
        // get eltDossier
        await daoEltDossiers
          .exec()
          .find({ dossier: row.id })
          .then((rows) => {
            row.payload = rows;
          })
          .catch((err) => {
            throw err;
          });
      }
      res.status(200).json({
        success: true,
        message: "Liste des elements du dossier",
        result: dossiers,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Impossible de récuperer les elements du dossier",
        result: err,
      });
    });
};

module.exports = {
  updateDossier,
  completeDossier,
  getDossierOne,
  getDossierAll,
};
