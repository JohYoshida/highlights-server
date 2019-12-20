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
        res.send(strains);
      })
      .catch(err => {
        res.send({ err });
      });
  });

  // Post a new strain
  router.post("/:type/:name", (req, res) => {
    let id = uuid();
    let { type, name } = req.params;
    console.log(type, name);
    // Check for existing strain
    knex("strains")
      .first()
      .where({ type, name })
      .then(strain => {
        if (strain) {
          res.send({
            msg: "A strain with that name already exists."
          });
        } else {
          // Insert new strain into db
          knex("strains")
            .insert({ id, name, type })
            .then(() => {
              res.send({
                msg: "Added strain to database.",
                obj: { id, name, type }
              });
            })
            .catch(err => {
              res.send({
                msg: "Failed to add strain to database. Error:\n" + err
              });
              console.log(err);
            });
        }
      })
      .catch(err => {
        res.send({
          msg: "Failed database check. Error:\n" + err
        });
        console.log(err);
      });
  });

  // Delete all strains
  router.delete("/", (req, res) => {
    knex("strains")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all strains" });
      })
      .catch(err => {
        res.send({ msg: "Failed to delete all strains. Error:\n" + err });
        console.log(err);
      });
  });
      });
  });

  return router;
};
