const express = require("express");
const uuid = require("uuid/v1");
const moment = require("moment");

// Database requirements
const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

module.exports = () => {
  const router = express.Router();

  // List purchases
  router.get("/", (req, res) => {
    knex("purchases").then(purchases => {
      res.send(purchases);
    });
  });

  // Post a new purchase
  router.post("/", (req, res) => {
    let purchase = {
      id: uuid(),
      product_id: uuid(),
      moisture: "moist",
      density: "dense",
      size: "large",
      amount: "much",
      createdAt: moment().format()
    };
    // Insert new purchase into db
    knex("purchases")
      .insert(purchase)
      .then(() => {
        res.send({ msg: "Added to db", obj: purchase });
      });
  });

  // Delete all purchases
  router.delete("/", (req, res) => {
    knex("purchases")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all purchases" });
      });
  });

  return router;
};
