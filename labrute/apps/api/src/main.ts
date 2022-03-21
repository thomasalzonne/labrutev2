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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(characterRouter);
app.use(usersRouter);

// const character = new Character(Character.generate('Totz'));
// const charactertrocho = new Character(Character.generate('Vinz'));
// const weapon : IWeapon = {name: 'Infinity Edge', agility: 3, speed: -3, strength: 3};
// const botrk : IWeapon = {name: 'Blade of the ruined King', agility:1, speed:0, strength: 2};

app.get('/api/fight', isLoggedIn, (req, res) => {
  // const fight = new Fight(stallos, n_n);
  // const play = fight.play();
  // res.send(play);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
