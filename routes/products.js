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
    knex("products")
      .then(products => {
        res.send(products);
      })
      .catch(err => {
        res.send({ err });
        console.log(err);
      });
  });

  // Post a new product by ID
  router.post("/:producer_id/:strain_id", (req, res) => {
    let id = uuid();
    let { producer_id, strain_id } = req.params;
    let product = { id, producer_id, strain_id };
    // Check for existing product
    knex("products")
      .first()
      .where({ producer_id, strain_id })
      .then(existingProduct => {
        if (existingProduct) {
          res.send({
            msg: "A product with that information already exists."
          });
        } else {
          // Insert new product into db
          knex("products")
            .insert(product)
            .then(() => {
              res.send({ msg: "Added product to database.", obj: product });
            })
            .catch(err => {
              res.send({ err });
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

  // Delete all products
  router.delete("/", (req, res) => {
    knex("products")
      .del()
      .then(() => {
        res.send({ msg: "Deleted all products" });
      })
      .catch(err => {
        res.send({ msg: "Failed to delete all strains. Error:\n" + err });
        console.log(err);
      });
  });

  // Delete product by ID
  router.delete("/:id", (req, res) => {
    let { id } = req.params;
    knex("products")
      .where({ id })
      .del()
      .then(() => {
        res.send({ msg: "Deleted product " + id });
      })
      .catch(err => {
        res.send({ msg: "Failed to delete product. Error:\n" + err });
        console.log(err);
      });
  });

  return router;
};
