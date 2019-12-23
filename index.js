// Server requirements
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const moment = require("moment");
const uuid = require("uuid/v1");
const PORT = process.env.PORT || 4000;
const app = express();

// Database requirements
const dbconfig = require("./knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

// Router requirements
const sessionsRouter = require("./routes/sessions")(knex);
const strainsRouter = require("./routes/strains")(knex);
const producersRouter = require("./routes/producers")(knex);
const productsRouter = require("./routes/products")(knex);
const purchasesRouter = require("./routes/purchases")(knex);

// Parse application/json
app.use(bodyParser.json());

// Routers
app.use("/producers", producersRouter);
app.use("/products", productsRouter);
app.use("/purchases", purchasesRouter);
app.use("/sessions", sessionsRouter);
app.use("/strains", strainsRouter);

// Send all data as a JSON object
app.get("/", (req, res) => {
  knex("producers")
    .then(producers => {
      knex("products")
        .then(products => {
          knex("purchases")
            .then(purchases => {
              knex("sessions")
                .then(sessions => {
                  knex("strains")
                    .then(strains => {
                      res.send({
                        producers,
                        products,
                        purchases,
                        sessions,
                        strains
                      });
                    })
                    .catch(err => {
                      res.send({ err });
                    });
                })
                .catch(err => {
                  res.send({ err });
                });
            })
            .catch(err => {
              res.send({ err });
            });
        })
        .catch(err => {
          res.send({ err });
        });
    })
    .catch(err => {
      res.send({ err });
    });
});

// Start app
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
