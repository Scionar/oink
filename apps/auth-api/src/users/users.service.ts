import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { saltGenerator } from './helper/saltGenerator';
import { hashGenerator } from '../helper/hashGenerator';
import { uuidGenerator } from './helper/uuidGenerator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  registerUser(user: RegisterUserDto): Promise<User> {
    const salt = saltGenerator();
    const passwordHash = hashGenerator(user.password, salt);
    return this.usersRepository.save({ ...user, salt, password: passwordHash });
  }

  addUid(id: number): Promise<UpdateResult> {
    const uuid = uuidGenerator(id);
    return this.usersRepository.update({ id: Number(id) }, { uuid: uuid });
  }

  getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  removeUserByEmail(email: string): Promise<DeleteResult> {
    return this.usersRepository.delete({ email });
  }
}
