const { environment } = require("../config");
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

const isProduction = environment === "production";

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

// Routes not found
router.use((_req, _res, next) => {
  const err = new Error("Resource Not found");
  err.status = 404;
  err.title = "Resource Not found";
  err.errors = {
    message: "The requested resource could not be found"
  };
  return next(err);
});

// Platform specific errors
router.use((err, _req, _res, next) => {
  // // Check for multer errors
  // if (err instanceof multer.MulterError) {
  //   err.status = 400;
  //   err.errors = { fileUploadError: err.message };
  //   err.message = err.code;
  //   return next(err);
  // }

  // Check for MongoDB errors
  if (err.code === 11000) {
    err.status = 422;
    err.title = "Duplicate key error";
    err.message = "Username or email already exists.";
    const fields = Object.keys(err.keyValue);
    err.errors = { duplicateCredentials: fields };
    return next(err);
  }
  next(err);
});

// Final error route that formats the error and sends all errors
router.use((err, req, res, _next) => {
  err.status = err.status || 500;
  err.title = err.title || "Server Error";
  err.message = err.message || "Something went wrong. Internal server error.";
  err.errors = err.errors || { server: err.message };

  const error = {
    title: err.title,
    errors: err.errors,
    status: err.status,
    message: err.message,
    timestamp: new Date().toLocaleString()
  };

  console.error(error);

  if (isProduction) {
    res.status(err.status).json(error);
  } else {
    // Add the stack trace in development and debug mode
    error.route = req.url;
    error.stack = err.stack;
    res.status(err.status).json(error);
  }
});

module.exports = router;
