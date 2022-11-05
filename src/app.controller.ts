import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getHello(@Request() req): string {
    console.log('req.user:', req.user);
    return this.appService.getHello();
  }
}
