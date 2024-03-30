const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', authMiddleware.authenticateToken, UserController.getAll);
router.post('/', UserController.create);
router.put('/:id', authMiddleware.authenticateToken, UserController.update);
router.delete('/:id', authMiddleware.authenticateToken, UserController.delete);
router.get('/:id', authMiddleware.authenticateToken, UserController.getOne);
router.post('/login', [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long')
  ], UserController.login);

module.exports = router;
