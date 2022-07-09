import { Test, TestingModule } from '@nestjs/testing';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

describe('RateController', () => {
  let controller: RateController;

  const mockData = [
    { currency: 'AUD', cryptocurrency: 'BTC', rate: 13231.12 },
    { currency: 'AUD', cryptocurrency: 'ETH', rate: 1234.12 },
  ];

  const mockRateService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((currency, cryptocurrency, dto) => ({
      currency,
      cryptocurrency,
      ...dto,
    })),
    findAll: jest.fn().mockImplementation(() => mockData),
    findOne: jest
      .fn()
      .mockImplementation((currency, cryptocurrency) =>
        mockData.find(
          (rate) =>
            rate.currency === currency &&
            rate.cryptocurrency === cryptocurrency,
        ),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateController],
      providers: [RateService],
    })
      .overrideProvider(RateService)
      .useValue(mockRateService)
      .compile();

    controller = module.get<RateController>(RateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a rate', () => {
      const dto = {
        currency: 'test-currency',
        cryptocurrency: 'test-cryptocurrency',
        rate: parseFloat((Math.random() * 10000).toFixed(2)),
      };

      expect(controller.create(dto)).toEqual({
        currency: 'test-currency',
        cryptocurrency: 'test-cryptocurrency',
        rate: expect.any(Number),
      });

      expect(mockRateService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a rate', () => {
      const dto = { rate: 1314.11 };
      expect(
        controller.update('test-currency', 'test-cryptocurrency', dto),
      ).toEqual({
        currency: 'test-currency',
        cryptocurrency: 'test-cryptocurrency',
        ...dto,
      });

      expect(mockRateService.update).toBeCalledWith(
        'test-currency',
        'test-cryptocurrency',
        dto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of rates', () => {
      expect(controller.findAll()).toBe(mockData);
    });
  });

  describe('findeOne', () => {
    it('should return a rate', () => {
      expect(controller.findOne('AUD', 'BTC')).toStrictEqual({
        currency: 'AUD',
        cryptocurrency: 'BTC',
        rate: 13231.12,
      });
    });
  });
});
