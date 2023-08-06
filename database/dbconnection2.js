const mariadb = require("mariadb");
const mysql = require("mysql");

const Promise = require("bluebird");
require("dotenv").config();

// Create a connection pool
var pool = mysql.createPool({
  // connectionLimit: 10,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_USERPWD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

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
      this.pool.getConnection((err, connection) => {
        if (err) {
          console.error("Connexion to database failed :", err);
          rej(err);
        }
        console.log("Connected to database...");
        this.conn = connection;
        res(connection);
      });
    });
  }

  // run all query
  async run(sql, params = []) {
    return new Promise((res, rej) => {
      this.pool.query(sql, params, (err, results) => {
        if (err) {
          console.log(
            "an error occured while running this query: ",
            sql,
            params
          );
          rej(err);
        }
        console.log("query performed well : ", results);
        res(results);
      });
    });
  }
}

exports.poolConn = poolConn;
exports.AppDAO = AppDAO;
