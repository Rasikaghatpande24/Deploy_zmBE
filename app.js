const express = require('express');
const mongoose = require('mongoose');

const resRoutes = require('./Routes/Restaurant');


const hostname = 'localhost';
const port = process.env.PORT || 6503;

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());


app.use('/api', resRoutes);

mongoose.connect('mongodb+srv://zm_clone_user:Zm_123456@cluster0.5vatg.mongodb.net/Zm_db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {

    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    });
}).catch(err => {
    console.log(err);
})