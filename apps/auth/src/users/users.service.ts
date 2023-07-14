import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private userRepo: UsersRepository) {}

    async getUserByEmail(email: string) {
        return await this.userRepo.getUserByEmail(email);
    }
}
