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

// Serve static files in production
// Serve static files in production
if (isProduction) {
  const staticPath = path.resolve(__dirname, "../web");
  console.log("Serving static files from:", staticPath);
  app.use(express.static(staticPath));
}

const indexPath = path.resolve(__dirname, "../web", "index.html");
console.log("Index Path:", indexPath);

// Catch-all route for frontend
app.get(/^((?!\/api).)*$/, (req, res) => {
  console.log("Serving index.html");
  res.sendFile(indexPath);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
