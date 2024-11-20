const express = require("express");
const { check } = require("express-validator");
const handleValidationErrors = require("../../utils/validation");
const bcrypt = require("bcryptjs");
const prisma = require("../../config/prisma.config");
const router = express.Router();

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Username must be between 6 and 20 characters long"),
  check("email").exists({ checkFalsy: true }).withMessage("Email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors
];

// Sign up (create user)
// POST /api/users
router.post("/", validateSignup, async (req, res, next) => {
  const incomingUser = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(incomingUser.password, salt);
    const newUser = await prisma.user.create({
      data: {
        firstName: incomingUser.firstName,
        lastName: incomingUser.lastName,
        username: incomingUser.username,
        email: incomingUser.email,
        hashedPassword
      }
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    next(error);
  }
});

// Get user by id
// GET /api/users/:id
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId)
      },
      include: {
        hashedPassword: false
      }
    });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Delete user by id
// DELETE /api/users/:id
// Will delete all associated projects and files
router.delete("/:userId", async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.session.user.id !== Number(req.params.userId)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.userId)
      }
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
