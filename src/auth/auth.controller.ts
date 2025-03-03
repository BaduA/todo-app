import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/_decorators/public.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt.refresh.guard';
import { Throttle } from '@nestjs/throttler';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
  @Post('register')
  @Public()
  async register(@Body() dto:RegisterDTO) {
    return this.authService.register(dto);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Throttle({
    short: { limit: 1, ttl: 1000 },
    long: { limit: 2, ttl: 60000 },
  })
  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-tokens')
  refreshTokens(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.authService.generateTokenPair(
      (req.user as any).attributes,
      req.headers.authorization?.split(' ')[1],
      (req.user as any).refreshTokenExpiresAt,
    );
  }
}
