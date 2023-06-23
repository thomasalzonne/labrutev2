import { Router } from 'express';
import db from '../db';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import isLoggedIn, { UserRequest } from '../middlewares/isLoggedIn';

const router = Router();

router.post('/api/user/create', (req, res) => {
  db('users')
    .where({ username: req.body.username })
    .first()
    .then((e) => {
      if (!e) {
        db('users')
          .insert({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
          })
          .then((e) => {
            const token = jwt.sign({ id: e}, 'SECRET');
            const user = {username: req.body.username, token};
            res.send(user)
          });
      } else {
        res.send('username already used');
      }
    });
});
router.post('/api/user/login', (req, res) => {
  if(!req.body.username || !req.body.password) return res.status(400)
  db('users')
    .where({ username: req.body.username })
    .first()
    .then((e) => {
      if(e){
        if (bcrypt.compareSync(req.body.password, e.password)) {
          console.log(e)
          const token = jwt.sign({ id: e.id }, 'SECRET');
          const user = {id: e.id, username: e.username, token };
          res.send(user);
        } else {
          res.status(401);
        }
      }
    });
});

router.get('/api/user/me', isLoggedIn, (req: UserRequest, res) => {
  return res.send(req.user);
});

export default router;
