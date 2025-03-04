import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findMany();
  }

}
