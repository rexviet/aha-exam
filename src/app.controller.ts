import { CurrentUser } from '@modules/auth/auth.session';
import { AuthenticatedGuard } from '@modules/auth/authenticated.guards';
import { ICurrentUser } from '@modules/auth/domain/current-user.model';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getHello(@CurrentUser() currentUser: ICurrentUser, @Request() req): string {
    return this.appService.getHello();
  }
}
