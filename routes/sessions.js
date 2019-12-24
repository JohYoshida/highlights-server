const express = require("express");
const uuid = require("uuid/v1");
const moment = require("moment");

// Database requirements
const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

module.exports = () => {
  const router = express.Router();

  // List sessions
  router.get("/", (req, res) => {
    knex("sessions")
      .then(sessions => {
        res.send(sessions);
      })
      .catch(err => {
        res.send({ msg: "Failed to access database. Error:\n" + err });
        console.log(err);
      });
  });

  // Post a new session
  router.post("/:purchase_id/:product_id/:rating", (req, res) => {
    const { purchase_id, rating } = req.params;
    let session = {
      id: uuid(),
      product_id,
      purchase_id,
      rating,
      createdAt: moment().format()
    };
    // Insert new session into db
    knex("sessions")
      .insert(session)
      .then(() => {
        res.send({ msg: "Added to database", obj: session });
      })
      .catch(err => {
        res.send({ msg: "Failed to add to database. Error:\n" + err });
        console.log(err);
      });
  });

  // Delete all sessions
  router.delete("/", (req, res) => {
    knex("sessions")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all sessions" });
      })
      .catch(err => {
        res.send({ err });
        console.log(err);
      });
  });

  return router;
};
