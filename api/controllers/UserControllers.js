const User = require("../models/User");
const { validationResult } = require("express-validator");

const UserController = {
  getAll(req, res) {
    User.getAll()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.json(error);
      });
  },

  async create(req, res) {
    try {
      const { firstname, lastname, email, password } = req.body;
      const hashedPassword = await User.hashPassword(password);
      User.create(firstname, lastname, email, hashedPassword)
        .then((users) => {
          res.status(201).send("User registered successfully");
        })
        .catch((error) => {
          res.json(error);
        });
    } catch (error) {
      res.status(500).send("Error registering user");
    }
  },

  getOne(req, res) {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  },

  update(req, res) {
    const userId = parseInt(req.params.id);
    const { firstname, lastname, email, password } = req.body;
    User.update(firstname, lastname, email, password, userId)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.json(error);
      });
  },

  delete(req, res) {
    const userId = parseInt(req.params.id);
    User.delete(userId)
      .then((users) => {
        res.status(200).json("user was deleted successfuly.");
      })
      .catch((error) => {
        res.json(error);
      });
  },

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
      }

      const { email, password } = req.body;
      const user = await User.getUserByEmail(email);
      if (user && (await User.comparePasswords(password, user.password))) {
        const token = User.generateToken(user);
        res.json({ token });
      } else {
        res.status(401).send("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

module.exports = UserController;
