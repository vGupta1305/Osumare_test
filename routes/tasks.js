const express = require('express');
const router = express.Router();

let tasks = []; 

router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
});

router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }
    const task = {
        id: tasks.length + 1, 
        title, 
        description,
        completed: false 
    };
    tasks.push(task);
    res.status(201).json(task);
});

router.put('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    const { title, description, completed } = req.body;
    task.title = title;
    task.description = description;
    task.completed = completed;
    res.status(200).json(task);
});

router.delete('/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

module.exports = router;
