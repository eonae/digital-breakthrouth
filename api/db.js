const mongoose = require('mongoose');
const { mongoUri } = require('./config');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('open', () => {
  console.log('Connected to database...');
});

module.exports = mongoose.connection;
