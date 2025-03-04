import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '15d' },
    }),
    PrismaModule,
    CaslModule
  ],
  providers: [AuthService, LocalStrategy, JWTStrategy,JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
