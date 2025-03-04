import { Module } from '@nestjs/common';
import { DutyController } from './controllers/duty.controller';
import { DutyService } from './duty.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DutyAdminController } from './controllers/duty.admin.controller';
import { DutyModController } from './controllers/duty.mod.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DutyController, DutyAdminController, DutyModController],
  providers: [DutyService],
})
export class DutyModule {}
