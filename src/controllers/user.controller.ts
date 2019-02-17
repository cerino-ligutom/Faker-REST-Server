import { User } from '@app/models';
import { Request, Response } from 'express';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
  async getAllUsers(req: Request, res: Response) {
    const users = await User.query();
    const usersDto = users.map(user => user.getDto());
    res.send(usersDto);
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id: userId } = req.params;
      const user = await User.query()
        .where('id', userId)
        .first();

      if (!user) {
        res.status(404).send({
          message: 'Not found.'
        });
      } else {
        res.send(user.getDto());
      }
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  }
}
