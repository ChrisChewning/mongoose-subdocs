const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('error: ', err);
});
