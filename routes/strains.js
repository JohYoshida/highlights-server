const express = require("express");
const uuid = require("uuid/v1");
const moment = require("moment");

// Database requirements
const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

module.exports = () => {
  const router = express.Router();

  // List strains
  router.get("/", (req, res) => {
    knex("strains")
      .then(strains => {
        res.send(strains)
      })
  });

  // Post a new strain
  router.post("/", (req, res) => {
    let id = uuid();
    let name = "Purple Kush";
    let type = "Indica";
    // Check for existing strain
    knex("strains")
      .first()
      .where({ name })
      .then(strain => {
        if (strain) {
          res.send({
            msg: "A strain with that name already exists.",
            verified: false
          });
        } else {
          // Insert new strain into db
          knex("strains")
            .insert({ id, name, type })
            .then(() => {
              res.send({ msg: "Added to db", obj: { id, name, type }})
            })
        }
      })
      .catch(err => {
        res.send({ msg: "Failed to register user! Error:\n" + err, verified: false });
        console.log("Error!", err);
      })
  });

  // Delete all strains
  router.delete("/", (req, res) => {
    knex("strains")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all strains"})
      });
  });

  return router;
};
