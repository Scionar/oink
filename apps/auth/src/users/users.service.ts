import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { saltGenerator } from './helper/saltGenerator';
import { hashGenerator } from './helper/hashGenerator';

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
        const passwordHash = hashGenerator(user.password, salt)
        return this.usersRepository.save({ ...user, salt, password: passwordHash })
    }
}
