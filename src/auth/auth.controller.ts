// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body()
    body: {
      email: string;
      password: string;
      name?: string;
      avatarUrl?: string;
    },
  ) {
    console.log(
      'Creating user:',
      body.email,
      body.name,
      body.avatarUrl,
      body.password,
    );
    const user = await this.authService.signUp(
      body.email,
      body.password,
      body.name,
      body.avatarUrl,
    );
    return { message: 'User created', user };
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    const session = await this.authService.signIn(body.email, body.password);
    return { access_token: session.access_token };
  }
}
