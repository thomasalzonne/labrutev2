import { query, Router } from 'express';
import Fight from 'libs/game/src/lib/game/fight';
import Character, {
  ICharacter,
} from '../../../../libs/game/src/lib/game/character';
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
      }).first()
    );
  }
  res.send(array);
});

router.get(`/api/character/:id`, isLoggedIn, async (req: UserRequest, res) => {
  const character = await db('characters')
    .where({
      id: req.params.id,
    })
    .first();
  res.send(character);
});

router.get(
  '/api/characters/tofight',
  isLoggedIn,
  async (req: UserRequest, res) => {
    const charid = await db('users_characters')
      .join('characters', 'characters.id', 'users_characters.character_id')
      .whereNot({
        user_id: req.user.id,
      });
    res.send(charid);
  }
);

router.get(`/api/fight/:myid/:tofightcharid`, isLoggedIn, async (req, res) => {
  const char1: ICharacter = await db('characters')
    .where({ id: req.params.myid })
    .first();
  const char2: ICharacter = await db('characters')
    .where({ id: req.params.tofightcharid })
    .first();
  const p1 = new Character(char1);
  const p2 = new Character(char2);

  const fight = new Fight(p1, p2);
  const play = fight.play();
  res.send(play);
});

router.get(
  '/api/getcharacter/:id',
  isLoggedIn,
  async (req: UserRequest, res) => {
    const char = await db('characters')
      .where({
        id: req.params.id,
      })
      .first();
    const charweapons = await db('characters_weapons')
      .join('weapons', 'weapons.id', 'characters_weapons.weapon_id')
      .where({ character_id: req.params.id });
    const charpets = await db('characters_pets')
      .join('pets', 'pets.id', 'characters_pets.pet_id')
      .where({ character_id: req.params.id });
    res.send({
      character: char,
      weapons: charweapons,
      pets: charpets,
    });
  }
);

export default router;
