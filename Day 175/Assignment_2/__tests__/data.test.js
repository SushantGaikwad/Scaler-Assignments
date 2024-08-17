const request = require("supertest");
const { app, User } = require("../index");
const mongoose = require("mongoose");

jest.mock("../index".User); // Mock the entire User module

describe("GET /users/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it("should return a user by ID", async () => {
    try {
      const userId = "123";
      const mockUser = {
        _id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
      };

      // Mock User.findById to return the mock user
      jest.spyOn(User, "findById").mockReturnValueOnce(mockUser);

      const response = await request(app).get(`/users/${userId}`);
      console.log('>> > test 1 response status :', response.statusCode);
      console.log('>> > test 1response body :', response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUser); // Assert against the mocked user object
    } catch (error) {
      throw new Error("Not returning a user by ID");
    }
  });

  it("should handle internal server errors", async () => {
    try {
      const userId = "123";

      // Mock User.findById to throw an error
      jest.spyOn(User, "findById").mockImplementationOnce(() => {
        throw new Error("Internal server error");
      });

      const response = await request(app).get(`/users/${userId}`);
      console.log('>> > test response :', response.statusCode);
      console.log('>> > test response body :', response.body);

      expect(response.statusCode).toBe(500); // Now expects 500 status code
      // Update expectation based on your server's error response structure
      expect(response.body).toHaveProperty("message", "Internal server error");
    } catch (error) {
      throw new Error("Not handling internal server errors");
    }
  });
});
