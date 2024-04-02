const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/AuthMiddleware');
const TaskControllers = require('../controllers/TaskControllers');
const { check } = require('express-validator');

router.get('/', authMiddleware.authenticateToken, TaskControllers.getAll);
router.post('/', [
    check('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    check('priority_id').notEmpty().withMessage('Priority ID is required').isInt().withMessage('Priority ID must be an integer')
  ], authMiddleware.authenticateToken, TaskControllers.create);
router.put('/:id', [
    check('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    check('priority_id').notEmpty().withMessage('Priority ID is required').isInt().withMessage('Priority ID must be an integer')
  ], authMiddleware.authenticateToken, TaskControllers.update);
router.delete('/:id', authMiddleware.authenticateToken, TaskControllers.delete);
router.put('/done/:id', authMiddleware.authenticateToken, TaskControllers.done);

module.exports = router;
