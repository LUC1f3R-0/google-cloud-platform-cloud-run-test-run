import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { AuthService } from './auth.service';

@Controller('api')
@UseGuards(ApiKeyGuard)
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('pass') pass: string,
  ): Promise<{ ok: true }> {
    await this.auth.register(email, pass);
    return { ok: true };
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('pass') pass: string,
  ): Promise<boolean> {
    return this.auth.login(email, pass);
  }
}
