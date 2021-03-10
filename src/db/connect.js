const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/us', { useNewUrlParser: true });


db.on('error', (err) => {
  console.error('connection err:', err.message);
});

db.once('open', async function () {
  console.log('connected!');
  const user = await mongoose.model('user').find();
  console.log('user:', user);
});


const connectDB = function (url) {
  return new Promise((resolve, reject) => {
    mongoose.connection(url, (err) => {
      err ? reject(err) : resolve(mongoose.connection);
    });
  });
};
