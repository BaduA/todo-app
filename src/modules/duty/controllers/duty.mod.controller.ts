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
import { CreateDutyDTO } from '../dto/create.duty.dto';
import { DutyService } from '../duty.service';
import { Role } from '@prisma/client';
import { UpdateBodyDTO } from '../dto/update.duty.dto';
import { Roles } from 'src/decorators/role.decorator';

@Controller('tasks/mod')
export class DutyModController {
  constructor(private dutyService: DutyService) {}
  @Patch(':id')
  @Roles(Role.MODERATOR)
  async updateDuty(@Param('id') id: number, @Body() dto: UpdateBodyDTO) {
    return await this.dutyService.updateDuty(id, dto);
  }
}
