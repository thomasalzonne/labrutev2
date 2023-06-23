/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import Character from 'libs/game/src/lib/game/character';
import Fight from 'libs/game/src/lib/game/fight';
import { IWeapon } from 'libs/game/src/lib/game/weapon';
import characterRouter from './routers/characters';
import usersRouter from './routers/users';
import * as express from 'express';
import isLoggedIn from './middlewares/isLoggedIn';


const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  path: '/api/socket/'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(characterRouter);
app.use(usersRouter);

// const character = new Character(Character.generate('Totz'));
// const charactertrocho = new Character(Character.generate('Vinz'));
// const weapon : IWeapon = {name: 'Infinity Edge', agility: 3, speed: -3, strength: 3};
// const botrk : IWeapon = {name: 'Blade of the ruined King', agility:1, speed:0, strength: 2};

const port = process.env.port || 3333;
const server = http.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
  console.log('new client connected');
  socket.emit('connection', null);
  socket.on('send-message', message => {
    io.emit('message', message)
  })
});
server.on('error', console.error);
