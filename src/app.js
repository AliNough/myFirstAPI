const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.get("/books", (req, res) => {
  // NOTE: We need to get the ID from the query string in the request object
  const { id } = req.query;

  if (id) {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
      if (err) {
        console.log("Error running sql: " + err);

        res.status(500);
        res.json({
          message: "Internal Server Error",
        });
      }

      res.json({
        message: "list of products",
        data: rows,
      });
    });

    return;
  }

  // We need to run a sql query against our pocketbase DB to get all the products
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.log("Error running sql: " + err);

      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    }

    res.json({
      message: "list of products",
      data: rows,
    });
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
