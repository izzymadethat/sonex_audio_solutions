require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

// Standard middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Logging middleware
app.use(morgan("dev"));

// TODO: Test these routes then get rid of these routes and replace with your own
app.use("/", (req, res) => {
  if (isProduction) {
    return res.sendFile(
      path.resolve(__dirname, "../web", "dist", "index.html")
    );
  } else {
    return res.sendFile(
      path.resolve(__dirname, "../web", "dist", "index.html")
    );
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
