import { User } from '@app/models';
import { IJwtPayload, jwtService } from '@app/utils';
import { NextFunction, Request, Response } from 'express';
import faker from 'faker';
import passport from 'passport';
import { BaseController } from './base.controller';

export class AuthController extends BaseController {
  login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', async (err, user: User, info) => {
      console.log('err:', err);
      console.log('user:', user);
      console.log('info:', info);

      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send(info);
      }

      req.login(user, { session: false }, async error => {
        console.log('error:', error);
        if (error) {
          return next(error);
        }

        const payload: IJwtPayload = {
          userId: user.id
        };

        const token = jwtService.sign(payload);

        return res.json({ token });
      });
    })(req, res, next);
  }

  async register(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      username,
      email,
      password
    }: IRegistrationForm = req.body;

    if (!password.trim().length) {
      res.status(409).send({
        message: `Bad password.`
      });
      return;
    }

    const existingUser = await User.query()
      .where('username', username)
      .first();

    if (existingUser) {
      res.status(409).send({
        message: `Username ${username} is already taken.`
      });
      return;
    }

    await User.query().insert({
      firstName,
      lastName,
      username,
      email,
      avatarUrl: faker.image.avatar(),
      hash: password
    });

    res.send({ message: 'Successfully registered.' });
  }

  async me(req: Request, res: Response) {
    if (req.user) {
      const { hash, salt, ...user } = req.user;
      res.send(user);
    } else {
      res.status(401).send({
        message: 'Unauthenticated.'
      });
    }
  }
}

interface IRegistrationForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
