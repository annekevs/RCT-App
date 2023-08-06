/** le but est de
 * établir la connexion avec la base de données
 * pour chaque modèle créer sa table si elle n'existe pas encore dans la bd
 * */

const { AppDAO } = require("./dbconnection");
const Promise = require("bluebird");

// initialize connection to database and create all datatables if they don't exist

class InitDatabase {
  constructor() {
    this.dao = new AppDAO();
  }

  // control if all datatables have been created
  init = () => {
    // console.log('in the database connector :', this.dao)
    return new Promise((resolve, reject) => {
      if (!this.dao.conn) {
        this.dao
          .getConnection()
          .then((conn) => {
            // console.log('in the database connector :', this.dao);
          })
          .catch((error) => {
            console.log("an error occured", error);
            reject(error);
          });
      } else {
        console.log("init database finished");
      }
    });
  };
}

module.exports = InitDatabase;
