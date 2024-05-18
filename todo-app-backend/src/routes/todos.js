// routes/todos.js
const express = require('express');
const todosController = require('../controllers/todosController');

const todosRouter = (pool) => {
    const router = express.Router();

    router.get('/', (req, res) => todosController.getTodos(req, res, pool));
    router.post('/', (req, res) => todosController.createTodo(req, res, pool));
    router.delete('/:id', (req, res) => todosController.deleteTodo(req, res, pool));
    router.put('/:id/completed', (req, res) => todosController.updateTodo(req, res, pool));
    router.put('/:id/edit', (req, res) => todosController.todoToEdit(req, res, pool));

    return router;
};

module.exports = todosRouter;
