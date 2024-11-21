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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})