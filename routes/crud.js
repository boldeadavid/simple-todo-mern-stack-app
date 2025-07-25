const express = require('express');
const { body } = require('express-validator');
const crudController = require('../controllers/crud');

const router = express.Router();

// GET toate todo-urile
router.get('/get', crudController.getAllTodos);

// GET un singur todo
router.get('/get/:tid', crudController.getSingleTodo);

// POST un todo nou
router.post('/', [
    body('name', "Provide a valid name")
        .isLength({ min: 2})
        .trim(),
    body('status', "Provide a valid status")
        .isBoolean()
], crudController.postTodo);

// PUT update la todo
router.put('/put/:tid', [
    body('status', "Provide a valid status")
        .isBoolean()
], crudController.putTodo);

// DELETE un todo
router.delete('/delete/:tid', crudController.deleteTodo);

module.exports = router;
