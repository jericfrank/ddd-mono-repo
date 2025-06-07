import { Repository } from 'typeorm';

import { User } from '../models/user';

interface IUserRepository {
  save(user: User): Promise<User>;
  delete(id: string): Promise<User | null>;
}

class UserRepository implements IUserRepository {
  constructor(private readonly ormRepo: Repository<User>) {}

  async save(user: User): Promise<User> {
    return this.ormRepo.save(user);
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.ormRepo.findOneBy({ id });
    if (!user) return null;

    await this.ormRepo.delete({ id });
    return user;
  }
}

export { UserRepository, type IUserRepository };
