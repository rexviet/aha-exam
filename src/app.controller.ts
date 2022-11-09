import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
