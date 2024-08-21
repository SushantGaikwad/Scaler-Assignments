const request = require("supertest");
const app = require("./index");

describe('Age Validation Middleware', () => {
  test('should return error for no age parameter', async () => {
    const response = await request(app).get('/check-age');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid age. Age must be a number between 18 and 65."
    });
  });

  test('should return error for invalid age below range', async () => {
    const response = await request(app).get('/check-age?age=17');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid age. Age must be a number between 18 and 65."
    });
  });

  test('should return error for invalid age above range', async () => {
    const response = await request(app).get('/check-age?age=66');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid age. Age must be a number between 18 and 65."
    });
  });

  test('should succeed for valid age within range', async () => {
    const response = await request(app).get('/check-age?age=25');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Age is within the required range."
    });
  });
});
