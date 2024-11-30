const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = []; // Array to store tasks

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const newTask = { id: tasks.length + 1, title, description, dueDate, priority, status: "Pending" };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, priority, status } = req.body;
    const task = tasks.find((task) => task.id == id);
    if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        res.json(task);
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((task) => task.id != id);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost::27017/${PORT3000}`));
