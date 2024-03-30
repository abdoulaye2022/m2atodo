const Priority = require("../models/Priority");

const PriorityControllers = {
  getAll(req, res) {
    Priority.getAll()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  }
}

module.exports = PriorityControllers;