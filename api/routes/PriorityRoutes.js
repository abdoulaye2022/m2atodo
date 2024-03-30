const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/AuthMiddleware');
const PriorityController = require('../controllers/PriorityControllers');

router.get('/', authMiddleware.authenticateToken, PriorityController.getAll);

module.exports = router;