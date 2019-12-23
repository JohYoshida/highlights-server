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
    knex("purchases")
      .then(purchases => {
        res.send(purchases);
      })
      .catch(err => {
        res.send({ msg: "Failed to access database. Error:\n" + err });
        console.log(err);
      });
  });

  // Post a new purchase
  router.post("/:product_id", (req, res) => {
    const { product_id } = req.params;
    const { moisture, density, size, amount } = req.body;
    let purchase = {
      id: uuid(),
      product_id,
      moisture,
      density,
      size,
      amount,
      createdAt: moment().format()
    };
    // Insert new purchase into db
    knex("purchases")
      .insert(purchase)
      .then(() => {
        res.send({ msg: "Added to database", obj: purchase });
      })
      .catch(err => {
        res.send({ msg: "Failed to add to database. Error:\n" + err });
        console.log(err);
      });
  });

  // Delete all purchases
  router.delete("/", (req, res) => {
    knex("purchases")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all purchases" });
      })
      .catch(err => {
        res.send({ msg: "Failed to delete all purchases. Error:\n" + err });
        console.log(err);
      });
  });

  // Delete a purchases by ID
  router.delete("/:id", (req, res) => {
    let { id } = req.params;
    knex("purchases")
      .where({ id })
      .del()
      .then(() => {
        res.send({ msg: "Deleted purchase " + id });
      })
      .catch(err => {
        res.send({ msg: "Failed to delete purchase. Error:\n" + err });
        console.log(err);
      });
  });

  return router;
};
