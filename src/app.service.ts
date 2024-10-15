import { Injectable } from '@nestjs/common';

//App service
//TODO: Implement app service
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
