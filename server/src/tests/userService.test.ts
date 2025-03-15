import { UserService } from '../services/userService';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(); // Create a new instance of UserService before each test
  });

  it('should create a new user', () => {
    const newUser = userService.createUser('JohnDoe', 'password123');
    expect(newUser).toHaveProperty('id');
    expect(newUser.username).toBe('JohnDoe');
    expect(newUser.password).toBe('password123');
    expect(userService.getAllUsers()).toContainEqual(newUser);
  });

  it('should get all users', () => {
    userService.createUser('JohnDoe', 'password123');
    userService.createUser('JaneDoe', 'password456');

    const users = userService.getAllUsers();
    expect(users.length).toBe(2);
    expect(users[0].username).toBe('JohnDoe');
    expect(users[1].username).toBe('JaneDoe');
  });

  it('should get user by ID', () => {
    const user1 = userService.createUser('JohnDoe', 'password123');
    const user2 = userService.createUser('JaneDoe', 'password456');

    const foundUser = userService.getUserById(user1.id);
    expect(foundUser).toEqual(user1);

    const notFoundUser = userService.getUserById(999); // ID that doesn't exist
    expect(notFoundUser).toBeUndefined();
  });

  it('should update an existing user', () => {
    const user = userService.createUser('JohnDoe', 'password123');

    const updatedUser = userService.updateUser(user.id, 'NewJohnDoe', 'newpassword123');
    expect(updatedUser).toBeDefined();
    expect(updatedUser?.username).toBe('NewJohnDoe');
    expect(updatedUser?.password).toBe('newpassword123');

    const userNotUpdated = userService.updateUser(999, 'NonExistent', 'nonexistentpassword');
    expect(userNotUpdated).toBeNull();
  });

  it('should delete a user', () => {
    const user = userService.createUser('JohnDoe', 'password123');
    expect(userService.getAllUsers().length).toBe(1);

    const deleteResult = userService.deleteUser(user.id);
    expect(deleteResult).toBe(true);
    expect(userService.getAllUsers().length).toBe(0);

    const deleteNonExistent = userService.deleteUser(999); // ID that doesn't exist
    expect(deleteNonExistent).toBe(false);
  });
});
