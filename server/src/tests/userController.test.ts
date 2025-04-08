import { Request, Response } from "express";
import { createUserController } from "../controllers/userController";

const mockService = {
  getAllUsers: jest.fn(),
  createUser: jest.fn(),
  getUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = createUserController(mockService as any);

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all users", () => {
    const req = {} as Request;
    const res = mockRes();

    mockService.getAllUsers.mockReturnValue([{ id: 1, username: "testuser" }]);

    getAllUsers(req, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, username: "testuser" }]);
  });

  it("should create a user", () => {
    const req = {
      body: { username: "newuser", password: "pass" },
    } as Request;
    const res = mockRes();

    mockService.createUser.mockReturnValue({ id: 2, username: "newuser" });

    createUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 2, username: "newuser" });
  });

  it("should get a user by id", () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockRes();

    mockService.getUserById.mockReturnValue({ id: 1, username: "testuser" });

    getUserById(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 1, username: "testuser" });
  });

  it("should return 404 if user not found", () => {
    const req = { params: { id: "99" } } as unknown as Request;
    const res = mockRes();

    mockService.getUserById.mockReturnValue(null);

    getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User with id 99 not found" });
  });

  it("should update a user", () => {
    const req = {
      params: { id: "1" },
      body: { username: "updated", password: "123" },
    } as unknown as Request;
    const res = mockRes();

    mockService.updateUser.mockReturnValue({ id: 1, username: "updated" });

    updateUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 1, username: "updated" });
  });

  it("should return 404 if updating non-existing user", () => {
    const req = {
      params: { id: "99" },
      body: { username: "none", password: "123" },
    } as unknown as Request;
    const res = mockRes();

    mockService.updateUser.mockReturnValue(null);

    updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User with id 99 not found" });
  });

  it("should delete a user", () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockRes();

    mockService.deleteUser.mockReturnValue(true);

    deleteUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "User with id 1 deleted" });
  });

  it("should return 404 if deleting non-existing user", () => {
    const req = { params: { id: "99" } } as unknown as Request;
    const res = mockRes();

    mockService.deleteUser.mockReturnValue(null);

    deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User with id 99 not found" });
  });
});
