const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Връзка с MongoDB база данни
mongoose.connect('mongodb://127.0.0.1:27017/dogworld')
    .then(() => console.log('Успешна връзка с MongoDB'))
    .catch(err => console.error('Грешка при връзка с DB:', err));

// MongoDB Модели
const DogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    birthDate: Date,
    weights: [{ date: Date, weight: Number }],
    events: [{ title: String, date: Date, completed: Boolean }]
});

const Dog = mongoose.model('Dog', DogSchema);

// API Рутове (Endpoints)

// 1. Вземане на всички профили
app.get('/api/dogs', async (req, res) => {
    const dogs = await Dog.find();
    res.json(dogs);
});

// 2. Създаване на нов профил на куче
app.post('/api/dogs', async (req, res) => {
    const newDog = new Dog(req.body);
    await newDog.save();
    res.json(newDog);
});

// 3. Добавяне на тегло към профил
app.post('/api/dogs/:id/weight', async (req, res) => {
    const { id } = req.params;
    const { date, weight } = req.body;
    
    const dog = await Dog.findById(id);
    if (dog) {
        dog.weights.push({ date, weight });
        await dog.save();
        res.json(dog);
    } else {
        res.status(404).json({ message: 'Кучето не е намерено' });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сървърът работи на http://localhost:${PORT}`);
});