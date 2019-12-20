const express = require("express");
const uuid = require("uuid/v1");
const moment = require("moment");

// Database requirements
const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

module.exports = () => {
  const router = express.Router();

  // List products
  router.get("/", (req, res) => {
    knex("products").then(products => {
      res.send(products);
    })
    .catch(err => {
      res.send({ err });
    });
  });

  // Post a new product
  router.post("/", (req, res) => {
    let product = {
      id: uuid(),
      producer_id: uuid(),
      strain_id: uuid()
    };
    // Insert new product into db
    knex("products")
      .insert(product)
      .then(() => {
        res.send({ msg: "Added to db", obj: product });
      })
      .catch(err => {
        res.send({ err });
      });
  });

  // Delete all products
  router.delete("/", (req, res) => {
    knex("products")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all products" });
      })
      .catch(err => {
        res.send({ err });
      });
  });

  return router;
};
