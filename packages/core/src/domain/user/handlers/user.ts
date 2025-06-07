import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models/user';

interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserName {
  id: string;
  newName: string;
}

class UserHandler {
  constructor(private readonly userRepository: Repository<User>) {}

  async deleteById(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== 0;
  }
}


export { UserHandler };