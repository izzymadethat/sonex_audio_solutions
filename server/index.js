require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.local"
});

const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT;

const isProduction = process.env.NODE_ENV === "production";

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

// Catch-all route for frontend
app.get(/^((?!\/api).)*$/, (req, res) => {
  console.log("Serving index.html");
  res.sendFile(indexPath);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("MONGO_URI", process.env.MONGODB_URI);

    app.listen(port, () => {
      console.log(`Listening for requests on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
