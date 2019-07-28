const cfg = require('./config');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const history = require('connect-history-api-fallback');
const db = require('./db');
const MongoStore = require('connect-mongo')(session);
const coordinates = require('./coordinates');

const app = express();
const expressWs = require('express-ws')(app);

let client = null;

app.use(cors({
  origin: (origin, callback) => { callback(null, true)}, //'http://localhost:8081' | '*',
  credentials: true
}));

app.use(express.json());

app.use(session({
  store: new MongoStore({
    mongooseConnection: db,
  }),
  secret: 'best todo ever',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  },
  resave: true,
  saveUninitialized: false
}));

app.get('/api/test/:message', (req, res) => {

  console.log(req.params.message);
  if (client) {
    client.send(req.params.message);
    console.log('send via ws');
  }
  res.sendStatus(200);
});

app.ws('/', (ws, req) => {
  client = ws;
  client.on('close', () => {
    console.log('Socket was closed (');
    client = null;
  });

  client.on('message', msg => {
    const objMsg = JSON.parse(msg);
    if (objMsg.type = 'handshake') {
      function sendNext() {
        if (!client) return;
        if (client.readyState == 3) {
          console.log('Socket is closed!');
          return;
        }

        const c = coordinates.next();
        console.log(c);
        if (c) {
          client.send(JSON.stringify({
            type: 'position',
            timestamp: new Date(),
            coordinates: c
          }));
        } else {
          coordinates.drop();
          client.send(JSON.stringify({
            type: 'end',
            timestamp: new Date(),
            coordinates: c //null FINISHED!
          }));
        }
        setTimeout(sendNext, 2000);
      }
      setTimeout(sendNext, 2000);
    }
  });
});

app.use(history());

app.listen(process.env.PORT || cfg.port);
