// tests/controllers/userController.test.ts

import { describe, it, beforeEach, expect, vi } from 'vitest';
import { UserController } from '../../../src/controllers/userController.js';
import { UserResponseSchema, UserResponseArraySchema } from '../../../src/models/dtos/UserDTOs.js';
import { sendValidatedResponse } from '../../../src/middleware/validateResponseMiddleware.js';
import { UserNotFoundError } from '../../errors/UserNotFoundError.js';
import { UnauthorizedActionError } from '../../errors/UnauthorizedActionError.js';
import { User } from '@prisma/client';
import IUserController from '../../models/controllers/IUserController.js';
import Usercontroller from '../../../src/controllers/userController.js';

// Mock sendValidatedResponse separately
vi.mock('../../../src/middleware/validateResponseMiddleware', () => ({
  sendValidatedResponse: vi.fn(),
}));

describe('UserController', () => {
  let mockService: any;
  let userController: IUserController;
  let req: any;
  let res: any;

  const fakeUser: User = {
    id: 'user123',
    username: 'JohnDoe',
    password: 'password123',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockService = {
      getAllUsers: vi.fn(),
      getUserById: vi.fn(),
      createUser: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    };
    userController = Usercontroller(mockService);

    req = {
      params: {},
      body: {},
      user: fakeUser,
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [fakeUser];
      mockService.getAllUsers.mockResolvedValue(users);

      await userController.getAllUsers(req, res);

      expect(mockService.getAllUsers).toHaveBeenCalled();
      expect(sendValidatedResponse).toHaveBeenCalledWith(res, UserResponseArraySchema, users);
    });
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      req.params.id = 'user123';
      mockService.getUserById.mockResolvedValue(fakeUser);

      await userController.getUserById(req, res);

      expect(mockService.getUserById).toHaveBeenCalledWith('user123');
      expect(sendValidatedResponse).toHaveBeenCalledWith(res, UserResponseSchema, fakeUser);
    });

    it('should return 404 if user not found', async () => {
      req.params.id = 'user123';
      mockService.getUserById.mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(mockService.getUserById).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: `User with id user123 not found` });
    });
  });

  describe('getCurrentUser', () => {
    it('should return the currently authenticated user', () => {
      userController.getCurrentUser(req, res);

      expect(sendValidatedResponse).toHaveBeenCalledWith(res, UserResponseSchema, fakeUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      req.body = { username: 'JohnDoe', password: 'password123' };
      mockService.createUser.mockResolvedValue(fakeUser);

      await userController.createUser(req, res);

      expect(mockService.createUser).toHaveBeenCalledWith('JohnDoe', 'password123');
      expect(sendValidatedResponse).toHaveBeenCalledWith(res, UserResponseSchema, fakeUser);
    });
  });

  describe('updateUser', () => {
    it('should update the user itself, if found', async () => {
      req.body = { username: 'NewName', password: 'newPassword' };
      req.params.id = fakeUser.id;
      mockService.updateUser.mockResolvedValue(fakeUser);

      await userController.updateUser(req, res);

      expect(mockService.updateUser).toHaveBeenCalledWith(fakeUser.id, 'NewName', 'newPassword');
      expect(sendValidatedResponse).toHaveBeenCalledWith(res, UserResponseSchema, fakeUser);
    });

    it('should throw UnauthorizedActionError if trying to update another user without admin role', async () => {
      req.body = { username: 'NewName', password: 'newPassword' };
      req.params.id = 'otherUserId';

      await expect(userController.updateUser(req, res)).rejects.toThrow(UnauthorizedActionError);
    });

    it('should allow admin to update another user', async () => {
      req.body = { username: 'NewName', password: 'newPassword' };
      req.params.id = 'otherUserId';
      req.user.role = 'admin';
      mockService.updateUser.mockResolvedValue(fakeUser);

      await userController.updateUser(req, res);
      expect(mockService.updateUser).toHaveBeenCalledWith('otherUserId', 'NewName', 'newPassword');
      expect(sendValidatedResponse).toHaveBeenCalledWith(res, UserResponseSchema, fakeUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete the user', async () => {
      mockService.deleteUser.mockResolvedValue(fakeUser);
      req.params.id = fakeUser.id;

      await userController.deleteUser(req, res);

      expect(mockService.deleteUser).toHaveBeenCalledWith(fakeUser.id);
      expect(res.json).toHaveBeenCalledWith({ message: `User with id ${fakeUser.id} deleted` });
    });

    it('should throw UnauthorizedActionError if trying to delete another user without admin role', async () => {
      req.params.id = 'otherUserId';
      req.user.role = 'user';

      await expect(userController.deleteUser(req, res)).rejects.toThrow(UnauthorizedActionError);
    });

    it('should allow admin to delete another user', async () => {
      req.params.id = 'otherUserId';
      req.user.role = 'admin';
      mockService.deleteUser.mockResolvedValue(fakeUser); 
      
      await userController.deleteUser(req, res);
      expect(mockService.deleteUser).toHaveBeenCalledWith('otherUserId');
      expect(res.json).toHaveBeenCalledWith({ message: `User with id otherUserId deleted` });
    });
  });
});
