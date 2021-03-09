const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/us', { useNewUrlParser: true });


db.on('error',);
