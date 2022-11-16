import { Request, Response } from 'express';
import { IService } from '../protocols';
import ThrowError from '../utils/throwError';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
  }

  
  async GetAllUsers(req: Request, res: Response) {
    try {
      const users = await this.service.GetAllUsers();

      return res.status(201).json(users);
    } catch (error) {
      const { status, message } = error as ThrowError;
      return res.status(status).json({ message });
    }
  }
  
  async createUser(req: Request, res: Response) {
    try {
      const createdUser = await this.service.createUser(req.body);

      return res.status(201).json(createdUser);
    } catch (error) {
      const { status, message } = error as ThrowError;
      return res.status(status).json({ message });
    }
  }

  /* 
  async createAccount(req: Request, res: Response) {
    try {
      const createdAccount = await this.service.createAccount(req.body.balance);

      return res.status(201).json(createdAccount);
    } catch (error) {
      const { status, message } = error as ThrowError;
      return res.status(status).json({ message });
    }
  }
  */

}
