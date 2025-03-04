import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateDutyDTO } from '../dto/create.duty.dto';
import { DutyService } from '../duty.service';
import { Role } from '@prisma/client';
import { UpdateBodyDTO } from '../dto/update.duty.dto';
import { Request } from 'express';

@Controller('tasks')
export class DutyController {
  constructor(private dutyService: DutyService) {}
  @Post()
  async createDuty(@Req() req, @Body() dto: CreateDutyDTO) {
    dto.userId = req.user.userId;
    return await this.dutyService.createDuty(dto);
  }
  @Delete(':id')
  async deleteDuty(@Req() req, @Param('id') id: number) {
    var duty = await this.dutyService.getDuty(id);
    if (req.user!.userId !== duty?.userId) throw new BadRequestException();
    return await this.dutyService.deleteDuty(id);
  }
  @Patch(':id')
  async updateDuty(
    @Req() req,
    @Param('id') id: number,
    @Body() dto: UpdateBodyDTO,
  ) {
    var duty = await this.dutyService.getDuty(id);
    if (req.user!.userId !== duty?.userId) throw new BadRequestException();
    return await this.dutyService.updateDuty(id, dto);
  }
  @Get()
  async getTasks(@Req() req) {
    return await this.dutyService.getUsersDuties(req.user.id);
  }
  @Get('user/:id')
  async getTasksUser(@Param('id') id: string) {
    return await this.dutyService.getUsersDuties(id);
  }
  @Get(':id')
  async getTask(@Param('id') id: number) {
    return await this.dutyService.getDuty(id);
  }
}
