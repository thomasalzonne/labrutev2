import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import db from '../db';

export interface UserRequest extends Request {
  user: any;
}

export default async function (
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const payload: any = jwt.verify(req.headers.authorization, 'SECRET');
    const user = await db('users').where({ id: payload.id }).first();
    if (user) {
      req.user = user;
      return next();
    } else return res.status(401).send('invalid token');
  }
  return res.status(401).send('not logged in');
}
