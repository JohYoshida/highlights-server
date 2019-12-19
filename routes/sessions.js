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
        res.send(sessions)
      })
  });

  // Post a new session
  router.post("/", (req, res) => {
    let session = {
      id: uuid(),
      product_id: uuid(),
      purchase_id: uuid(),
      rating: 3,
      createdAt: moment().format(),
    };
    // Insert new session into db
    knex("sessions")
      .insert(session)
      .then(() => {
        res.send({ msg: "Added to db", obj: session })
      })
  });

  // Delete all sessions
  router.delete("/", (req, res) => {
    knex("sessions")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all sessions"})
      });
  });


  return router;
};
