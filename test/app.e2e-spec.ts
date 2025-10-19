import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api'); // 為測試應用程式加上全域前綴
    await app.init();
  });

  it('/items (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/items') // 必須使用包含全域前綴的完整路徑
      .expect(200)
      .expect('Hello World!');
  });
});
