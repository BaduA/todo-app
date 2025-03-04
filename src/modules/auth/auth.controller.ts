import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import { RegisterDTO } from './dto/register.dto';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { JwtRefreshAuthGuard } from 'src/guards/jwt.refresh.guard';

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
  async register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }

  @Throttle({
    short: { limit: 1, ttl: 1000 },
    long: { limit: 2, ttl: 60000 },
  })
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
