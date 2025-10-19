import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateItemDto } from './app.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });

    it('should call appService.getHello()', () => {
      jest.spyOn(appService, 'getHello');
      appController.getHello();
      expect(appService.getHello).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new item and return success message', () => {
      const createItemDto: CreateItemDto = { name: 'coca-cola' };
      const result = appController.create(createItemDto);
      expect(result).toBe('This action adds a new item with name: coca-cola');
    });

    it('should handle different item names', () => {
      const createItemDto: CreateItemDto = { name: 'test-item' };
      const result = appController.create(createItemDto);
      expect(result).toBe('This action adds a new item with name: test-item');
    });
  });

  describe('findOne', () => {
    it('should return an item by id', () => {
      const id = '1';
      const result = appController.findOne(id);
      expect(result).toBe('This action returns a #1 item');
    });

    it('should handle different ids', () => {
      const id = '123';
      const result = appController.findOne(id);
      expect(result).toBe('This action returns a #123 item');
    });

    it('should handle string ids', () => {
      const id = 'abc';
      const result = appController.findOne(id);
      expect(result).toBe('This action returns a #abc item');
    });
  });

  describe('update', () => {
    it('should update an item and return success message', () => {
      const id = '1';
      const createItemDto: CreateItemDto = { name: 'updated-item' };
      const result = appController.update(id, createItemDto);
      expect(result).toBe('This action updates a #1 item with name updated-item');
    });

    it('should handle different ids and names', () => {
      const id = '456';
      const createItemDto: CreateItemDto = { name: 'another-item' };
      const result = appController.update(id, createItemDto);
      expect(result).toBe('This action updates a #456 item with name another-item');
    });
  });

  describe('remove', () => {
    it('should remove an item and return success message', () => {
      const id = '1';
      const result = appController.remove(id);
      expect(result).toBe('This action removes a #1 item');
    });

    it('should handle different ids', () => {
      const id = '789';
      const result = appController.remove(id);
      expect(result).toBe('This action removes a #789 item');
    });
  });
});
