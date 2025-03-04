import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { JwtRefreshAuthGuard } from './auth/guards/jwt.refresh.guard';
import { DutyModule } from './duty/duty.module';
import { CaslModule } from './casl/casl.module';
import { PoliciesGuard } from './auth/guards/policy.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot(),
    DutyModule,
    CaslModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
