import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { Post, Req } from '@nestjs/common/decorators/http';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
