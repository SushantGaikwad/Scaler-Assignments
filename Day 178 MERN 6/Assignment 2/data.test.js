const request = require("supertest");
const app = require("./index"); // Replace with your app file path

describe("JWT Authentication", () => {
  const user = { username: "admin", password: "password" }; // Replace with your password hashing logic

  test("Login Route - Valid Credentials", async () => {
    try {
      const response = await request(app).post("/login").send(user); // Use the pre-defined user

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token"); // Expect a token in the response
    } catch (error) {
      throw new Error("Login with Credentials failed");
    }
  });

  test("Login Route - Invalid Credentials", async () => {
    try {
      const invalidCredentials = {
        username: "user",
        password: "wrong_password",
      };
      const response = await request(app)
      .post("/login")
      .send(invalidCredentials);
      
      expect(response.status).toBe(401);
      expect(response.text).toBe("Invalid credentials"); // Expect error response structure
    } catch (error) {
      throw new Error("Login with Invalid Credentials not handled Correctly");
    }
  });

  test("Secret Route - Valid JWT", async () => {
    try {
      const loginResponse = await request(app).post("/login").send(user);
      const token = loginResponse.body.token;

      const secretResponse = await request(app)
        .get("/secret")
        .set("Authorization", `Bearer ${token}`); // Include Bearer prefix

      expect(secretResponse.status).toBe(200);
      expect(secretResponse.text).toBe("Welcome to the secret area"); // Adjust based on your response
    } catch (error) {
      throw new Error("Accessing secret area with JWT failed");
    }
  });

  test("Secret Route - Invalid JWT", async () => {
    try {
      const invalidToken = "invalid.token.string";
      const secretResponse = await request(app)
        .get("/secret")
        .set("Authorization", `Bearer ${invalidToken}`);

      expect(secretResponse.status).toBe(403);
    } catch (error) {
      throw new Error(
        "Accessing secret area with Invalid JWT not handled correctly"
      );
    }
  });

  test("Secret Route - No JWT", async () => {
    try {
      const secretResponse = await request(app).get("/secret");
      console.log(">>>   response:", secretResponse.status);
      console.log(">>>   response:", secretResponse.text);
      expect(secretResponse.status).toBe(401);
    } catch (error) {
      throw new Error(
        "Accessing secret area with Invalid JWT not handled correctly"
      );
    }
  });
});
