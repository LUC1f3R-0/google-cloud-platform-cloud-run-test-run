import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World, [${process.env.NODE_ENV}], [${process.env.POSSWORD}], [${process.env.ENV_VARS}], [${process.env.ENV_SECRET}]`;
  }
}
