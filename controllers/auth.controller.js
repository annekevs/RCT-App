const express = require("express");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { AppDAO } = require("../database/dbconnection");
require("dotenv").config();

const router = express.Router();
const dao = new AppDAO();
const daoUsers = new UserModel(dao);

// login user
router.post("/", async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).json({
        success: false,
        message: "All input is required",
      });
    }
    // Validate if user exist in our database
    const user = await daoUsers.exec().find(
      {
        username: username,
      },
      null,
      "1"
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
