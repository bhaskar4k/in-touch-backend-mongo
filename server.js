require('dotenv').config()
const clear = require('clear');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const all_api = require('./api/allAPI');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

app.use('/api', all_api);

mongoose.connect(process.env.MONGO_COMPASS_URI)
    .then(() => {
        console.log("Connected")
    }).catch((err) => {
        console.log(err)
    })

app.listen(process.env.PORT, () => {
    clear();
    console.log("Listening port - " + process.env.PORT);
})