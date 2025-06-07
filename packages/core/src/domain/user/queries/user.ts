import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { User } from '../models/user';

interface IUserQuerier {
  getAll(): Promise<User[]>;
}

@injectable()
class UserQuerier implements IUserQuerier {
  constructor(private readonly ormRepo: Repository<User>) {}

  async getAll(): Promise<User[]> {
    return await this.ormRepo.find();
  }
}

export { UserQuerier, type IUserQuerier };
