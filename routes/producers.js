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
        res.send(producers);
      })
      .catch(err => {
        res.send({ msg: "Failed to access database. Error:\n" + err });
        console.log(err);
      });
  });

  // Post a new producer
  router.post("/:name", (req, res) => {
    let id = uuid();
    let { name } = req.params;
    // Check for existing producer
    knex("producers")
      .first()
      .where({ name })
      .then(producer => {
        if (producer) {
          res.send({
            msg: "A producer with that name already exists."
          });
        } else {
          // Insert new producer into db
          knex("producers")
            .insert({ id, name })
            .then(() => {
              res.send({ msg: "Added to database.", obj: { id, name } });
            })
            .catch(err => {
              res.send({ msg: "Failed to add to database. Error:\n" + err });
              console.log(err);
            });
        }
      })
      .catch(err => {
        res.send({
          msg: "Failed to register user! Error:\n" + err,
          verified: false
        });
        console.log(err);
      });
  });

  // Delete all producers
  router.delete("/", (req, res) => {
    knex("producers")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all producers" });
      })
      .catch(err => {
        res.send({ err });
      });
  });

  return router;
};
