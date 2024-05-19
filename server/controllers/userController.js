const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// @method POST
// @route http://localhost:3000/api/users
// @PUBLIC

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, email, password } = req.body;
  if (!firstname || !email || !password) {
    res.status(400);
    throw new Error("Fields are incorrect/missing");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @method POST
// @route http://localhost:3000/api/users/login
// @ PUBLIC

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstname: user.firstname,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc get users data
// @route GET /api/users/users
// @access PRIVATE

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @method DELETE
// @route GET /api/users/:id
// @access PRIVATE
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const theOne = await User.deleteOne({ _id: req.params.id });
  res.status(200).json(theOne);
});

// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(400);
//     throw new Error("User not found");
//   }

//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not authenticated");
//   }

//   if (user._id.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   await User.findByIdAndDelete(req.params.id);

//   res.status(200).json({ id: req.params.id });
// });

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
};
