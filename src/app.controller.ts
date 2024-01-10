import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

import { ApiKeyGuard } from './auth/guards/api-key.guard';

//Convertir toda la clase con
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Excluir este endpoint de los guardianes
  // @SetMetadata('isPublic', true) sustituido por @Public()
  @Public()
  @Get('nuevo')
  newEndpoint() {
    return 'endpoint nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'endpoint saluda';
  }
}
