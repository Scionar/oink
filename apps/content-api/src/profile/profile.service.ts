import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/CreateProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(dto: CreateProfileDto, uuid: string) {
    const existing = await this.profileRepository.findOne({
      where: {
        uuid,
      },
    });

    if (existing) return { message: 'Profile exists already' };

    await this.profileRepository.save({ ...dto, uuid });

    return { message: 'Profile created successfully' };
  }

  async update(uuid: string, profile: any) {
    await this.profileRepository.update({ uuid }, { ...profile });
  }
}
