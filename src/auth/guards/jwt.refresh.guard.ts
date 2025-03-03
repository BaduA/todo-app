import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/_decorators/public.decorator';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
    
}
