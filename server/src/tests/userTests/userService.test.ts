import { UserService } from '../../services/userService';

const mockPrisma: any = {
    user: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
};

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        jest.clearAllMocks();
        userService = new UserService(mockPrisma); // Now you're passing the mock
    });

    it('createUser should create a new user', async () => {
        // Mock checkIfUserExists to return false
        mockPrisma.user.findFirst.mockResolvedValue(null); // User does not exist

        // Mock create to return a new user object
        mockPrisma.user.create.mockResolvedValue({
            id: 'id123',
            username: 'JohnDoe',
            password: 'password123',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const newUser = await userService.createUser('JohnDoe', 'password123');

        expect(newUser).toHaveProperty('id');
        expect(newUser.username).toBe('JohnDoe');
        expect(newUser.password).toBe('password123');
    });

    it('should throw error if user already exists', async () => {
        // Mock checkIfUserExists to return true
        mockPrisma.user.findFirst.mockResolvedValue({ id: 'id123', username: 'JohnDoe' }); // User exists

        await expect(userService.createUser('JohnDoe', 'password123')).rejects.toThrow(
            'User with username JohnDoe already exists'
        );
    });

    it('should get all users', async () => {
        mockPrisma.user.findMany.mockResolvedValue([
            { id: 'id1', username: 'JohnDoe', password: 'password123', createdAt: new Date(), updatedAt: new Date() },
            { id: 'id2', username: 'JaneDoe', password: 'password456', createdAt: new Date(), updatedAt: new Date() },
        ]);

        const users = await userService.getAllUsers();

        expect(users.length).toBe(2);
        expect(users[0].username).toBe('JohnDoe');
        expect(users[1].username).toBe('JaneDoe');
    });

    it('should get user by ID', async () => {
        const user = { id: 'id123', username: 'JohnDoe', password: 'password123', createdAt: new Date(), updatedAt: new Date() };
        
        // Mock getUserById to return a user
        mockPrisma.user.findUnique.mockResolvedValue(user);

        const foundUser = await userService.getUserById('id123');
        expect(foundUser).toEqual(user);
    });

    it('should update an existing user', async () => {
        const user = { id: 'id123', username: 'JohnDoe', password: 'password123', createdAt: new Date(), updatedAt: new Date() };

        // Mock getUserById to return a user
        mockPrisma.user.findUnique.mockResolvedValue(user);

        // Mock update to return the updated user
        mockPrisma.user.update.mockResolvedValue({
            id: 'id123',
            username: 'NewJohnDoe',
            password: 'newpassword123',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const updatedUser = await userService.updateUser('id123', 'NewJohnDoe', 'newpassword123');
        expect(updatedUser.username).toBe('NewJohnDoe');
        expect(updatedUser.password).toBe('newpassword123');
    });

    it('should delete a user', async () => {
        const user = { id: 'id123', username: 'JohnDoe', password: 'password123', createdAt: new Date(), updatedAt: new Date() };

        // Mock getUserById to return the user
        mockPrisma.user.findUnique.mockResolvedValue(user);

        // Mock delete to return the deleted user
        mockPrisma.user.delete.mockResolvedValue(user);

        const deletedUser = await userService.deleteUser('id123');
        expect(deletedUser).toEqual(user);
    });
});
