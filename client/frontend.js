const ncp = require('ncp');

const source = __dirname + '/../client/dist';
const destination = __dirname + '/dist';

ncp(source, destination, err => {
  if (err) console.log(err)
  else {
    console.log('done');
  }
});

