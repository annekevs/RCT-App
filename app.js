var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("cookie-session");
var { AppDAO } = require("./database/dbconnection");
require("dotenv").config();

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin.route");
const authController = require("./controllers/auth.controller");
const auth = require("./middlewares/auth");
const parametresRouter = require("./routes/parametres.route");
const registreRouter = require("./routes/gestionDossier.route");
const demandeRouter = require("./routes/demande.route");
const InitDatabase = require("./database/initdatabase");

var app = express();
// app configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: true })); // Automatically allow cross-origin requests
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "frontend", "build")));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       maxAge: 60000,
//     },
//   })
// );

// init database connection
// const dao = new AppDAO();
// dao
//   .getConnection()
//   .then(() => {
//     console.log("[success] Connection with database successfully");
//   })
//   .catch((error) => {
//     console.log(
//       "[error] couldn't connect to database. Something went wrong : ",
//       error
//     );
//   });

const db = new InitDatabase();
db.init()
  .then(() => {
    console.log("[success] Connection with database successfully");
  })
  .catch((error) => {
    console.log(
      "[error] Something went wrong during database initialization",
      error
    );
  });

app.use("/rct-api/login", authController); // connexion à l'application
app.use("/rct-api/admin", adminRouter); // interface d'administration (acces, creation des utilisateurs, dashboard et statistiques globales)
app.use("/rct-api/gestion", registreRouter); // gestion du dossier médical et des patients
app.use("/rct-api/demandes", demandeRouter); // gestion des demandes d'adhésion et d'inscription
app.use("/rct-api/parametres", parametresRouter); // configuration des paramètres de l'application

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message,
    result: undefined,
  });
});

module.exports = app;
