import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return hello payload including NODE_ENV', () => {
      const body = appController.getHello();
      expect(body).toContain('Hello World');
      expect(body).toContain(`[${process.env.NODE_ENV}]`);
    });
  });
});
