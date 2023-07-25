import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/CreateProfile.dto';
import { UpdateProfileDto } from './dto/UpdateProfile.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateProfileDto, @Req() request: any) {
    const uuid = request.user.uuid;
    console.log(uuid);
    await this.profileService.create(dto, uuid);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() dto: UpdateProfileDto, @Req() request: any) {
    const uuid = request.user.uuid;
    await this.profileService.update(uuid, dto);
  }
}
