import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateDutyDTO } from './dto/create.duty.dto';
import { DutyService } from './duty.service';
import { PoliciesGuard } from 'src/auth/guards/policy.guard';
import { CheckPolicies } from 'src/_decorators/policy.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/_decorators/action.decorator';
import { Duty } from 'src/casl/types/Duty';
import { Role } from '@prisma/client';
import { UpdateBodyDTO } from './dto/update.duty.dto';

@Controller('tasks')
export class DutyController {
  constructor(private dutyService: DutyService) {}
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Duty))
  async createDuty(@Req() req, @Body() dto: CreateDutyDTO) {
    if (req.user.role === Role.USER) dto.userId = req.user.userId;
    return await this.dutyService.createDuty(dto);
  }
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Duty))
  async deleteDuty(@Param('id') id: number) {
    return await this.dutyService.deleteDuty(id);
  }
  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Duty))
  async updateDuty(@Param('id') id: number, @Body() dto: UpdateBodyDTO) {
    return await this.dutyService.updateDuty(id, dto);
  }
  @Get()
  async getTasks(@Req() req) {
    return await this.dutyService.getUsersDuties(req.user.id);
  }
  @Get('user/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Duty))
  async getTasksUser(@Param('id') id: string) {
    return await this.dutyService.getUsersDuties(id);
  }
  @Get(':id')
  async getTask(@Param('id') id: number) {
    return await this.dutyService.getDuty(id);
  }
}
