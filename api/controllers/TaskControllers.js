const Task = require("../models/Task");

const TaskControllers = {
  getAll(req, res) {
    Task.getAll()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  },

  async create(req, res) {
    try {
      const { title, priority_id } = req.body;
      Task.create(title, "In progress", priority_id)
        .then((users) => {
          res.status(201).send("Task registered successfully");
        })
        .catch((error) => {
          res.json(error);
        });
    } catch (error) {
      res.status(500).send("Error registering task");
    }
  },
}

module.exports = TaskControllers;