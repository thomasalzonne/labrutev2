import { Router } from 'express';
import Character from 'libs/game/src/lib/game/character';
import db from '../db';
import isLoggedIn, { UserRequest } from '../middlewares/isLoggedIn';

const router = Router();

router.post(
  '/api/character/generate',
  isLoggedIn,
  async (req: UserRequest, res) => {
    if (typeof req.body.name !== 'string')
      return res.status(400).send('Invalid name');

    const check = await db('characters').where({ name: req.body.name }).first();

    if (check) return res.send('username already used');

    const character = new Character(Character.generate(req.body.name));

    const insertedCharacter = await db('characters').insert({
      name: character.character.name,
      level: character.character.level,
      strength: character.character.strength,
      agility: character.character.agility,
      speed: character.character.speed,
      vitality: character.character.vitality,
      defence: character.character.defence,
    });

    await db('users_characters').insert({
      user_id: req.user.id,
      character_id: insertedCharacter[0],
    });

    return res.send('Character created');
  }
);
router.get('/api/characters', isLoggedIn, async (req: UserRequest, res) => {
  const characters = await db('users_characters').where({
    user_id: req.user.id,
  });
  const array = [];
  for (let index = 0; index < characters.length; index++) {
    array.push(
      await db('characters').where({
        id: characters[index].character_id,
      })
    );
  }
  res.send(array);
});

export default router;
