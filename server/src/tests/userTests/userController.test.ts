// tests/controllers/userController.test.ts

import { createUserController } from '../../../src/controllers/userController';
import { UserResponseSchema, UserResponseArraySchema } from '../../../src/models/dtos/UserDTOs';
import { IUser } from '../../../src/models/IUser';
import { sendValidatedResponse } from '../../../src/middleware/validateResponseMiddleware';

// Mock sendValidatedResponse separately
jest.mock('../../../src/middleware/validateResponseMiddleware', () => ({
    sendValidatedResponse: jest.fn(),
}));

describe('UserController', () => {
    let mockService: any;
    let userController: ReturnType<typeof createUserController>;
    let req: any;
    let res: any;

    const fakeUser: IUser = {
        id: 'user123',
        username: 'JohnDoe',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        mockService = {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        };
        userController = createUserController(mockService);

        req = {
            params: {},
            body: {},
            user: fakeUser,
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
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
        it('should update the user if found', async () => {
            req.body = { username: 'NewName', password: 'newPassword' };
            mockService.updateUser.mockResolvedValue(fakeUser);

            await userController.updateUser(req, res);

            expect(mockService.updateUser).toHaveBeenCalledWith(fakeUser.id, 'NewName', 'newPassword');
            expect(sendValidatedResponse).toHaveBeenCalledWith(res, UserResponseSchema, fakeUser);
        });

        it('should return 404 if user not found during update', async () => {
            req.body = { username: 'NewName', password: 'newPassword' };
            mockService.updateUser.mockResolvedValue(null);

            await userController.updateUser(req, res);

            expect(mockService.updateUser).toHaveBeenCalledWith(fakeUser.id, 'NewName', 'newPassword');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: `User with id ${fakeUser.id} not found` });
        });
    });

    describe('deleteUser', () => {
        it('should delete the user', async () => {
            mockService.deleteUser.mockResolvedValue(fakeUser);

            await userController.deleteUser(req, res);

            expect(mockService.deleteUser).toHaveBeenCalledWith(fakeUser.id);
            expect(res.json).toHaveBeenCalledWith({ message: `User with id ${fakeUser.id} deleted` });
        });

        it('should return 404 if user not found during delete', async () => {
            mockService.deleteUser.mockRejectedValue(new Error('User not found'));

            await userController.deleteUser(req, res);

            expect(mockService.deleteUser).toHaveBeenCalledWith(fakeUser.id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: `User with id ${fakeUser.id} not found` });
        });
    });
});
