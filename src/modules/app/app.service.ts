import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! <br/> from Nest';
  }
  getWelcome(): string {
    return 'Welcome!';
  }
}
