import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { CheckPolicies } from 'src/_decorators/policy.decorator';
import { PoliciesGuard } from 'src/auth/guards/policy.guard';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/_decorators/action.decorator';
import { User } from 'src/casl/types/User';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findMany();
  }
  @Patch(':id/:role')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, User, 'role'),
  )
  async changeRole(@Param('id') id: string, @Param('role') role: Role) {
    return await this.usersService.changeRole({ id, role });
  }
}
