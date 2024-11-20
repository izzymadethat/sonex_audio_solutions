require("dotenv").config();

const { environment, sessionAuth, PORT } = require("./config");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");
const app = express();
const routes = require("./routes");

const isProduction = environment === "production";

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Security middleware
if (!isProduction) {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
  );
}
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      mediaSrc: ["'self'", "https://*.cloudfront.net"]
    }
  })
); // allows content from cloudfront
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
); // Adds security in headers

// Parse cookies for authentication
app.use(cookieParser());

// Session authentication
app.use(
  session({
    name: sessionAuth.cookieKey,
    secret: sessionAuth.accessSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "lax",
      maxAge: 60 * 60 * 24 * 30 * 1000 // 30 days
    }
  })
);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
