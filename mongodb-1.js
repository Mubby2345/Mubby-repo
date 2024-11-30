// User Model
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/ taskmanager")
.then
     console.log {"mongodb connected"}

const express = require('express');
const Task = require('./models/Task');
const authenticate = require('./middleware/authenticate');

const router = express.Router();
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


// Create Task
router.post('/tasks', authenticate, async (req, res) => {
    const { title, description, deadline, priority } = req.body;
    try {
        const task = await Task.create({ ...req.body, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});