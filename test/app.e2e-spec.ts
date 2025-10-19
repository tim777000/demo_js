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

  describe('/api/items', () => {
    it('GET should return "Hello World!"', () => {
      return request(app.getHttpServer())
        .get('/api/items')
        .expect(200)
        .expect('Hello World!');
    });

    it('POST should create a new item', () => {
      const createItemDto = { name: 'coca-cola' };
      return request(app.getHttpServer())
        .post('/api/items')
        .send(createItemDto)
        .expect(201)
        .expect('Content-Type', /text\/html/)
        .expect('This action adds a new item with name: coca-cola');
    });

    it('POST should handle different item names', () => {
      const createItemDto = { name: 'test-item' };
      return request(app.getHttpServer())
        .post('/api/items')
        .send(createItemDto)
        .expect(201)
        .expect('This action adds a new item with name: test-item');
    });

    it('POST should handle special characters in name', () => {
      const createItemDto = { name: 'item-name-with-spaces' };
      return request(app.getHttpServer())
        .post('/api/items')
        .send(createItemDto)
        .expect(201)
        .expect('This action adds a new item with name: item-name-with-spaces');
    });
  });

  describe('/api/items/:id', () => {
    it('GET should return an item by id', () => {
      return request(app.getHttpServer())
        .get('/api/items/1')
        .expect(200)
        .expect('This action returns a #1 item');
    });

    it('GET should handle different numeric ids', () => {
      return request(app.getHttpServer())
        .get('/api/items/123')
        .expect(200)
        .expect('This action returns a #123 item');
    });

    it('GET should handle string ids', () => {
      return request(app.getHttpServer())
        .get('/api/items/abc')
        .expect(200)
        .expect('This action returns a #abc item');
    });

    it('GET should handle alphanumeric ids', () => {
      return request(app.getHttpServer())
        .get('/api/items/abc123')
        .expect(200)
        .expect('This action returns a #abc123 item');
    });

    it('PUT should update an item', () => {
      const updateItemDto = { name: 'updated-item' };
      return request(app.getHttpServer())
        .put('/api/items/1')
        .send(updateItemDto)
        .expect(200)
        .expect('This action updates a #1 item with name updated-item');
    });

    it('PUT should handle different ids and names', () => {
      const updateItemDto = { name: 'another-item' };
      return request(app.getHttpServer())
        .put('/api/items/456')
        .send(updateItemDto)
        .expect(200)
        .expect('This action updates a #456 item with name another-item');
    });

    it('DELETE should remove an item', () => {
      return request(app.getHttpServer())
        .delete('/api/items/1')
        .expect(200)
        .expect('This action removes a #1 item');
    });

    it('DELETE should handle different ids', () => {
      return request(app.getHttpServer())
        .delete('/api/items/789')
        .expect(200)
        .expect('This action removes a #789 item');
    });

    it('DELETE should handle string ids', () => {
      return request(app.getHttpServer())
        .delete('/api/items/test-id')
        .expect(200)
        .expect('This action removes a #test-id item');
    });
  });

  describe('API edge cases', () => {
    it('should handle empty item name in POST', () => {
      const createItemDto = { name: '' };
      return request(app.getHttpServer())
        .post('/api/items')
        .send(createItemDto)
        .expect(201)
        .expect('This action adds a new item with name: ');
    });

    it('should handle very long ids', () => {
      const longId = '1234567890abcdefffghijklmnopqrstuvwxyz';
      return request(app.getHttpServer())
        .get(`/api/items/${longId}`)
        .expect(200)
        .expect(`This action returns a #${longId} item`);
    });
  });

  describe('/api/metrics', () => {
    it('GET should return Prometheus metrics', () => {
      return request(app.getHttpServer())
        .get('/api/metrics')
        .expect(200)
        .expect('Content-Type', /text\/plain/)
        .then(response => {
          expect(response.text).toContain('# HELP');
          expect(response.text).toContain('# TYPE');
          expect(response.text).toContain('process_cpu_user_seconds_total');
        });
    });
  });
});
