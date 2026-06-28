import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { CreateUserSchema, UpdateUserSchema } from './users.dto';

export class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = CreateUserSchema.parse(req.body);
      const user = await this.service.createUser(validatedData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = UpdateUserSchema.parse(req.body);
      const user = await this.service.updateUser(req.params.id, validatedData);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deactivateUser(req.params.id);
      res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
