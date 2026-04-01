import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async register(email: string, pass: string): Promise<void> {
    if (!email || !pass) {
      throw new BadRequestException('email and pass are required');
    }
    const existing = await this.users.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const password = await bcrypt.hash(pass, 10);
    await this.users.save(this.users.create({ email, password }));
  }

  async login(email: string, pass: string): Promise<boolean> {
    if (!email || !pass) {
      return false;
    }
    const user = await this.users.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    return bcrypt.compare(pass, user.password);
  }
}
