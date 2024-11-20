const express = require("express");
const { check } = require("express-validator");
const handleValidationErrors = require("../../utils/validation");
const bcrypt = require("bcryptjs");
const prisma = require("../../config/prisma.config");
const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Valid username or email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors
];

// Get currently authenticated user
// GET /api/auth
router.get("/", async (req, res) => {
  if (!req.session.user) return res.json({ user: null });

  const currentUser = await prisma.user.findUnique({
    where: {
      id: req.session.user.id
    },
    include: {
      hashedPassword: false,
      avatar: false
    }
  });

  return res.json(currentUser);
});

// Login a user
// POST /api/auth
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: credential }, { email: credential }]
      }
    });

    if (!user) {
      const err = new Error("User not found");
      err.status = 401;
      err.title = "Failed Login";
      err.errors = { login: "Couldn't find user with that username or email" };
      return next(err);
    }

    const validPassword = bcrypt.compareSync(
      password,
      user.hashedPassword.toString()
    );

    if (!validPassword) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login Failed";
      err.errors = {
        login: "The provided credentials were invalid."
      };
      return next(err);
    }

    const loggedInUser = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    req.session.user = loggedInUser;

    return res.json({
      user: loggedInUser
    });
  } catch (error) {
    next(error);
  }
});

// Logout a user
// DELETE /api/auth
router.delete("/", (req, res) => {
  // Destroy the user's auth session (removes "sonex_session_id" from cookies
  req.session.destroy();
  res.clearCookie("sonex_session_id");
  res.json({ message: "Successfully logged out" });
});

module.exports = router;
