const UserModel = require("../models/user.model");
const { dao, AppDAO } = require("../database/dbconnection");
const EncryptionService = require("../services/EncryptionService");

// const dao = new AppDAO();
const daoUsers = new UserModel(dao);

// get all users
exports.getAllUser = async (req, res) => {
  var result = await daoUsers
    .exec()
    .find()
    .then((users) => {
      if (users) {
        res.status(200).json({
          success: true,
          message: "Les utilisateurs ont été récuperés avec succes",
          result: users,
        });
      }
    })
    .catch((error) => {
      console.log("[error] get query failed...\n", error);
      res.status(200).json({
        success: false,
        message: "[error] impossible de recuperer la liste des utilisateurs",
        result: undefined,
      });
    });
  return result;
};

// get one user
exports.getOneUser = async (req, res) => {
  var result = await daoUsers
    .exec()
    .find({ id: req.params.id })
    .then((user) => {
      if (user) {
        res.status(200).json({
          success: true,
          message: "L'utilisateur a été récuperé avec succes",
          result: user,
        });
      }
    })
    .catch((error) => {
      console.log("[error] get query failed...\n", error);
      res.status(200).json({
        success: false,
        message: "[error] impossible de recuperer l'utilisateur spécifié",
        result: undefined,
      });
    });
  return result;
};

// create user
exports.createUser = async (req, res) => {
  var username, pass_word, role, enabled;
  // parsing request data
  try {
    console.log("[info] parsing request data...", req.body);
    username = req.body.username ? req.body.username : "";
    pass_word = req.body.password ? req.body.password : null;
    role = req.body.role ? parseInt(req.body.role) : 0;
    enabled = req.body.enabled ? parseInt(req.body.enabled) : 0;

    if (!(pass_word && username)) {
      res.status(400).json({
        success: false,
        message:
          "The username and password is empty, can't process the request",
        result: undefined,
      });
    }
  } catch (error) {
    console.log("parsing request data failed --", error);
    res.status(400).json({
      success: false,
      message:
        "Parsing data failed, bad request. Some informations are missing",
      result: undefined,
    });
  }

  // verify the user doesn\'t exists
  await checkUsername(username).then(async (result) => {
    if (result.success) {
      // l'utilisateur n'existe pas
      var password = await EncryptionService.encryptPwd(pass_word); // hashé le mot de passe
      const user = { username, password, role, enabled };
      return await daoUsers
        .exec()
        .save(user)
        .then((val) => {
          const insertId = new Number(val.insertId);
          res.status(201).json({
            success: true,
            message: "The user has been successfully created",
            result: insertId,
          });
        })
        .catch((error) => {
          res.status(400).json({
            success: false,
            message: "[error] impossible de créer l'utilisateur",
            result: undefined,
          });
        });
    } else {
      // l'utilisateur existe
      res.status(200).json({
        success: false,
        message: "The user already exists",
        result: undefined,
      });
    }
  });
};

/** check if the user already exists
 * @param {string} username name of the user
 */
async function checkUsername(username) {
  return await daoUsers
    .exec()
    .find({ username: username }, null, "1")
    .then((row) => {
      if (row) {
        // user exists
        console.log("user exists : ", row);
        return {
          success: false,
          code_status: 400,
          message: "The user already exists",
        };
      } else {
        // user doesn't exists
        return {
          success: true,
          code_status: 200,
          message: "The user doesn't exist",
        };
      }
    });
}

// update user
exports.updateUser = async (req, res) => {
  // to do verifier l'intégrité de ces champs
  return await daoUsers
    .exec()
    .update(req.body, { id: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "Utilisateur mis à jour",
        });
      }
    })
    .catch((error) => {
      console.log("[error] update user failed...", error);
      res.status(400).json({
        success: false,
        message: "Impossible de mettre à jour l'utilisateur",
      });
    });
};

// delete user
exports.deleteUser = async (req, res) => {
  return await daoUsers
    .exec()
    .delete({ id: req.params.id })
    .then((r) => {
      if (r) {
        res.status(200).json({
          success: true,
          message: "Utilisateur supprimé",
        });
      }
    })
    .catch((error) => {
      console.log("[error] delete user failed...", error);
      res.status(400).json({
        success: false,
        message: "Impossible de mettre à jour l'utilisateur",
      });
    });
};
