import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private userService: UsersService,
    // configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "SECRET",
    });
  }

  async validate(payload: any) {
    const authUser = await this.userService.findById(payload.sub);
    if (!authUser) {
      throw new UnauthorizedException();
    }
    return {
      attributes: authUser,
      refreshTokenExpiresAt: new Date(payload.exp * 1000),
    };
  }
}