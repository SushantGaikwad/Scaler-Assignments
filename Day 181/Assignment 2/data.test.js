const request = require("supertest");
const mongoose = require("mongoose");
const { app, User } = require("./index");

describe("POST /users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("creates a new user account", async () => {
    try {
      const userData = {
        username: "testuser",
        password: "testpassword",
        email: "test@example.com",
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(userData);
    } catch (error) {
      throw new Error("Account Creation Failed");
    }
  });

  it("fetches a list of all user accounts", async () => {
    try {
      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
      // Add more assertions to validate the response body
    } catch (error) {
      throw new Error("Fetching user account list failed");
    }
  });

  it("fetches a single user account by its ID", async () => {
    try {
      // Create a test user account in the database
      const user = await User.create({
        username: "testuser1",
        password: "testpassword",
        email: "test1@example.com",
      });
      console.log(">>> test   user:", user);

      const response = await request(app).get(`/users/${user._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        username: "testuser1",
        email: "test1@example.com",
      });
    } catch (error) {
      throw new Error("Fetching single user account by ID failed");
    }
  });

  it("updates a user account", async () => {
    try {
      // Create a test user account in the database
      const user = await User.create({
        username: "testuser2",
        password: "testpassword",
        email: "test2@example.com",
      });

      const updatedUserData = {
        username: "updateduser",
        password: "updatedpassword",
        email: "updated@example.com",
      };

      const response = await request(app)
        .put(`/users/${user._id}`)
        .send(updatedUserData)
        .set("Accept", "application/json");


      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedUserData);
    } catch (error) {
      throw new Error("Updating a user account failed");
    }
  });

  it("deletes a user account", async () => {
    try {
      // Create a test user account in the database
      const user = await User.create({
        username: "testuser3",
        password: "testpassword",
        email: "test3@example.com",
      });

      const response = await request(app).delete(`/users/${user._id}`);
      expect(response.status).toBe(200);

      // Ensure the user account is deleted from the database
      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    } catch (error) {
      throw new Error("Deleting a user account failed");
    }
  });
});
