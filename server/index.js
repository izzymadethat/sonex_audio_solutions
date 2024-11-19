require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
// const mongoose = require("mongoose");
const prisma = require("./config/prisma.config");
const port = process.env.PORT;
const { environment } = require("./config");

const isProduction = environment === "production";

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve static files in production
if (isProduction) {
  const staticPath = path.resolve(__dirname, "../web");
  console.log("Serving static files from:", staticPath);
  app.use(express.static(staticPath));
}

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Catch-all route for frontend
app.get(/^((?!\/api).)*$/, (req, res) => {
  const indexPath = path.resolve(__dirname, "../web/index.html");
  console.log("Serving index.html");
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
