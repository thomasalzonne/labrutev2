/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import Character from 'libs/game/src/lib/game/character';
import Fight from 'libs/game/src/lib/game/fight';
import {IWeapon} from 'libs/game/src/lib/game/weapon';
import * as bcrypt from 'bcrypt';

import * as express from 'express';
import db from './db';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const character = new Character(Character.generate('Totz'));
const charactertrocho = new Character(Character.generate('Vinz'));
const weapon : IWeapon = {name: 'Infinity Edge', agility: 3, speed: -3, strength: 3};
const botrk : IWeapon = {name: 'Blade of the ruined King', agility:1, speed:0, strength: 2};

const stallos = new Character(Character.generate('Stallos'));
const n_n = new Character(Character.generate('n_n'));

stallos.character.weapons.push(weapon);

const fight = new Fight(stallos, n_n);
const play = fight.play();

app.get('/api/fight', (req, res) => {
  res.send(play);
});
app.post('/api/user/create', (req, res) => {
  db('users').where({username: req.body.username}).first().then( e => {
    if(!e){
      db('users').insert({
          username: req.body.username, 
          password: bcrypt.hashSync(req.body.password, 10),
        }).then( e => res.send(e));
    }
    else{
      res.send("username already used");
    }
  });
});
app.post('/api/user/login', (req, res) => {
  db('users').where({username: req.body.username}).first().then( e => {
    if( bcrypt.compareSync(req.body.password, e.password))  {
      const user = {username: e.username};
      res.send(user);
    }
    else{
      res.status(401);
    }
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
