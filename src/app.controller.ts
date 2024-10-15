import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

//Home route (localhost:3000/)
@Controller({
  version: '1',
}) // localhost:3000/
export class AppController {
  constructor(private readonly appService: AppService) {}

  // localhost:3000/
  getHello(): string {
    return this.appService.getHello();
  }
}
