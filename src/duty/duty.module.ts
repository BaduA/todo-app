import { Module } from '@nestjs/common';
import { DutyController } from './duty.controller';
import { DutyService } from './duty.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [PrismaModule,CaslModule],
  controllers: [DutyController],
  providers: [DutyService],
})
export class DutyModule {}
