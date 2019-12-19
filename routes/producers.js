const express = require("express");
const uuid = require("uuid/v1");
const moment = require("moment");

// Database requirements
const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

module.exports = () => {
  const router = express.Router();

  // List producers
  router.get("/", (req, res) => {
    knex("producers")
      .then(producers => {
        res.send(producers)
      })
  });

  // Post a new producer
  router.post("/", (req, res) => {
    let id = uuid();
    let name = "Aurora";
    // Check for existing producer
    knex("producers")
      .first()
      .where({ name })
      .then(producer => {
        if (producer) {
          res.send({
            msg: "A producer with that name already exists.",
            verified: false
          });
        } else {
          // Insert new producer into db
          knex("producers")
            .insert({ id, name })
            .then(() => {
              res.send({ msg: "Added to db", obj: { id, name }})
            })
        }
      })
      .catch(err => {
        res.send({ msg: "Failed to register user! Error:\n" + err, verified: false });
        console.log("Error!", err);
      })
  });

  // Delete all producers
  router.delete("/", (req, res) => {
    knex("producers")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all producers"})
      });
  });


  return router;
};
