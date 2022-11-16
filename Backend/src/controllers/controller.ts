import { Request, Response } from 'express';
import { IService } from '../protocols';
import ThrowError from '../utils/throwError';

export default class Controller {
  constructor(private service: IService) {
    this.service = service;
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

  async login(req: Request, res: Response) {
    try {
      const token = await this.service.login(req.body);

      return res.status(200).json({ token });
    } catch (error) {
      const { status, message } = error as ThrowError;
      return res.status(status).json({ message });
    }
  }

  async GetBalance(req: Request, res: Response) {
    try {
      const balance = await this.service.GetBalance(req.body.user.data.username);
            
      return res.status(200).json({balance: balance.accounts.balance});
    } catch (error) {
      const { status, message } = error as ThrowError;
      return res.status(status).json({ message });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = await this.service.createTransaction(req.body.user.data.username, req.body);

      return res.status(200).json(transaction);
    } catch (error) {
      const { status, message } = error as ThrowError;
      return res.status(status).json({ message });
    }
  }
}
