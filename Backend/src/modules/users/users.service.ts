import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import bcrypt from 'bcrypt';

export class UsersService {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  async createUser(data: CreateUserDto) {
    const existing = await this.repository.findByEmailOrPhone(data.email, data.phone);
    if (existing) {
      throw new Error('User with email or phone already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({ ...data, password: hashedPassword });
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      is_active: user.is_active,
    };
  }

  async updateUser(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await this.repository.update(id, data);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    };
  }

  async getAllUsers() {
    return this.repository.findAll();
  }

  async deactivateUser(id: string) {
    return this.repository.deactivate(id);
  }
}
