const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname));

mongoose.connect('mongodb+srv://jaskainth38:hEKqzCn7soXmE79u@cluster0.c8o2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const connect = mongoose.connection;

connect.on('error', console.error.bind(console, 'MongoDB connection error:'));

connect.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number
});

const User = mongoose.model('User', userSchema);

app.get('/', async (request, response) => {
    response.sendFile(__dirname + '/user.html');
});

app.post('/users', async (request, response) => {
    const user = new User({
        name : request.body.name,
        email : request.body.email,
        age : request.body.age
    });
    const newItem = await user.save();
    response.status(201).json({scuccess:true});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})