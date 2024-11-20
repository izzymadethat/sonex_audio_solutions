import { environment } from "../config";

const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

if (environment === "production") {
  const path = require("path");
  router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../web", "index.html"));
  });

  router.use(express.static(path.resolve(__dirname, "../../web")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^((?!\/api).)*$/, (req, res) => {
    const indexPath = path.resolve(__dirname, "../../web/index.html");
    console.log("Serving index.html");
    res.sendFile(indexPath);
  });
}

module.exports = router;
