const logMessages = (val, tableName) => {
  var successMessage = "";
  var errorMessage = "";
  switch (val) {
    case "find": // find
      successMessage = `Les ${tableName} ont été récuperés avec succes `;
      errorMessage = `Impossible de recuperer la liste des ${tableName}`;
      break;
    case "find one": // find one
      successMessage = `Un(e) ${tableName} a été récuperé avec succes `;
      errorMessage = `Impossible de recuperer un(e) ${tableName}`;
      break;
    case "create": // create
      successMessage = `Un(e) ${tableName} a été ajouté(e) avec succes `;
      errorMessage = `Impossible d'ajouter un(e) ${tableName}`;
      break;
    case "update": // update
      successMessage = `${tableName} a été mis à jour avec succes `;
      errorMessage = `Impossible de mettre à jour ${tableName}`;
      break;
    case "delete": // delete
      successMessage = `${tableName} a été supprimé avec succes `;
      errorMessage = `Impossible de supprimer ${tableName}`;
      break;
    default:
      break;
  }
  return { successMessage, errorMessage };
};

class ModelCtrl {
  constructor(modelName, daoModel) {
    this.daoModel = daoModel;
    this.modelName = modelName;
  }

  // get all result
  getAll = async (req, res) => {
    const dataObject = req.query ? req.query : [];
    const order = req.query.order ? req.query.order : null;
    const limit = req.query.limit ? req.query.limit : null;
    console.log("get all params ", dataObject, order, limit);
    await this.daoModel
      .exec()
      .find(dataObject, order, limit)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: logMessages("find", this.daoModel.TABLE_NAME).successMessage,
          result: result,
        });
      })
      .catch((error) => {
        console.log(
          `[error] get all in table ${this.daoModel.TABLE_NAME} failed...\n`,
          error.text
        );
        res.status(400).json({
          success: false,
          message: logMessages("find", this.daoModel.TABLE_NAME).errorMessage,
          result: error.text,
        });
      });
  };

  // get one region
  getOne = async (req, res) => {
    await this.daoModel
      .exec()
      .find({ id: req.params.id }, null, "1")
      .then((result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: logMessages("find one", this.daoModel.TABLE_NAME)
              .successMessage,
            result: result,
          });
        } else {
          res.status(200).json({
            success: true,
            message: logMessages("find one", this.daoModel.TABLE_NAME)
              .successMessage,
            result: {},
          });
        }
      })
      .catch((error) => {
        console.log(
          `[error] get one in table ${this.daoModel.TABLE_NAME} failed...\n`,
          error
        );
        res.status(400).json({
          success: false,
          message: logMessages("find one", this.daoModel.TABLE_NAME)
            .errorMessage,
          result: error,
        });
      });
  };

  create = async (req, res) => {
    console.log(`check data for the model ${this.modelName} :`, req.body);
    await this.daoModel
      .exec()
      .save(req.body)
      .then((result) => {
        if (result) {
          res.status(201).json({
            success: true,
            message: logMessages("create", this.modelName).successMessage,
            result: result,
          });
        }
      })
      .catch((error) => {
        console.log(
          `[error] insert in table ${this.daoModel.TABLE_NAME} failed...\n`,
          error.text
        );
        res.status(400).json({
          success: false,
          message: logMessages("create", this.daoModel.TABLE_NAME).errorMessage,
          result: error.text,
        });
      });
  };

  update = async (req, res) => {
    await this.daoModel
      .exec()
      .update(req.body, { id: req.params.id })
      .then((result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: logMessages("update", this.daoModel.TABLE_NAME)
              .successMessage,
            result: {},
          });
        }
      })
      .catch((error) => {
        console.log(
          `[error] update in table ${this.daoModel.TABLE_NAME} failed...\n`,
          error.text
        );
        res.status(400).json({
          success: false,
          message: logMessages("update", this.daoModel.TABLE_NAME).errorMessage,
          result: error.text,
        });
      });
  };

  delete = async (req, res) => {
    await this.daoModel
      .exec()
      .delete({ id: req.params.id })
      .then((result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: logMessages("delete", this.daoModel.TABLE_NAME)
              .successMessage,
            result: result,
          });
        }
      })
      .catch((error) => {
        console.log(
          `[error] delete in table ${this.daoModel.TABLE_NAME} failed...\n`,
          error.text
        );
        res.status(200).json({
          success: false,
          message: logMessages("delete", this.daoModel.TABLE_NAME).errorMessage,
          result: error.text,
        });
      });
  };
}

module.exports = ModelCtrl;
