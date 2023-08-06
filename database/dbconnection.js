const mariadb = require("mariadb");
const Promise = require("bluebird");
require("dotenv").config();

// Create a connection pool

try {
  var pool = mariadb.createPool({
    // connectTimeout: 60 * 60 * 1000,
    // acquireTimeout: 60 * 60 * 1000,
    // timeout: 60 * 60 * 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_USERPWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    trace: true,
  });
} catch (error) {
  console.log("unenable to connect to mysql remote database : ", err);
  throw err;
}

// Expose a method to establish connection with MariaDB SkySQL
var poolConn = Object.freeze({
  pool: pool,
});

class AppDAO {
  constructor(pool0) {
    try {
      if (!pool0) {
        this.pool = pool;
      } else {
        this.pool = pool0;
      }
    } catch (error) {
      console.log("pool error :", error);
    }

    // afficher les paramètres de connexion à la base de données
    console.log(" database server credentials :", {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_USERPWD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    this.conn = null;
  }

  // demander la connexion à la base de données
  async getConnection() {
    console.log("try to connect to database....");
    return new Promise((res, rej) => {
      this.pool
        .getConnection()
        .then((connection) => {
          console.log("Connected to database...");
          this.conn = connection;
          res(connection);
        })
        .catch(function (error) {
          // console.error("Connexion to database failed :", error);
          rej(error);
        });
    });
  }

  // run all query
  async run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.pool
        .query(sql, params)
        .then((res, err) => {
          if (err) throw err;
          resolve(res);
        })
        .catch((err) => {
          //console.log("an error occured while running this query: ", sql, params);
          reject(err);
        });
      // .finally(() => {
      //   if (this.conn) this.conn.end();
      // });
    });
  }
}

exports.dao = new AppDAO();
exports.poolConn = poolConn;
exports.AppDAO = AppDAO;
