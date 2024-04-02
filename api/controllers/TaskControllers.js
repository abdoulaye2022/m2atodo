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
        .then((task) => {
          res.status(201).send("Task registered successfully");
        })
        .catch((error) => {
          res.json(error);
        });
    } catch (error) {
      res.status(500).send("Error registering task");
    }
  },

  async update(req, res) {
    try {
      const taskId = parseInt(req.params.id);
      const { title, priority_id } = req.body;
      Task.update(title, "In progress", priority_id, taskId)
        .then((task) => {
          res.status(201).send("Task updated successfully");
        })
        .catch((error) => {
          res.json(error);
        });
    } catch (error) {
      res.status(500).send("Error registering task");
    }
  },

  delete(req, res) {
    const taskId = parseInt(req.params.id);
    Task.delete(taskId)
      .then((task) => {
        res.status(200).json("user was deleted successfuly.");
      })
      .catch((error) => {
        res.json(error);
      });
  },

  async done(req, res) {
    try {
      const taskId = parseInt(req.params.id);
      Task.done("Done", taskId)
        .then((task) => {
          res.status(201).send("Task updated successfully");
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