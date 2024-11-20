require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;
const routes = require("./routes");

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(routes);

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
