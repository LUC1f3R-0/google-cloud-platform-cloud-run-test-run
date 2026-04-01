import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World, [${process.env.NODE_ENV}], [${process.env.POSSWORD}], [${process.env.ENV_VARS}], [${process.env.ENV_SECRET}]`;
  }
}
