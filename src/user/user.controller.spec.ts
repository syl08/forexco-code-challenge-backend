import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    register: jest.fn((dto) => {
      return {
        id: Math.floor(Math.random() * 100),
        createdAt: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = { username: 'test-username', password: 'test-password' };

    expect(controller.register(dto)).toEqual({
      id: expect.any(Number),
      username: 'test-username',
      password: 'test-password',
      createdAt: expect.any(Number),
    });

    expect(mockUserService.register).toHaveBeenCalledWith(dto);
  });
});
