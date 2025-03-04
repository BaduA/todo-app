import { Body, Injectable } from '@nestjs/common';
import { CreateDutyDTO } from './dto/create.duty.dto';
import { UpdateBodyDTO } from './dto/update.duty.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DutyService {
  constructor(private prisma: PrismaService) {}

  async createDuty(dto: CreateDutyDTO) {
    return await this.prisma.duty.create({ data: dto });
  }
  async deleteDuty(id: number) {
    return await this.prisma.duty.delete({ where: { id } });
  }
  async updateDuty(id: number, dto: UpdateBodyDTO) {
    return await this.prisma.duty.update({
      where: { id },
      data: dto,
    });
  }
  async getUsersDuties(userId: string) {
    return await this.prisma.duty.findMany({
      where: { userId },
      orderBy: {
        priority: 'asc',
      },
    });
  }
  async getDuty(id: number) {
    return await this.prisma.duty.findFirst({ where: { id } });
  }
}
