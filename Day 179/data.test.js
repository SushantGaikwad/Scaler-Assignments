const request = require('supertest');
const app = require('./index');

describe('POST /register', () => {
  it('should register a user successfully with valid username and password', async () => {
    const response = await request(app)
    .post('/register')
    .send({ username: 'testuser', password: 'testpass' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: "User registered successfully" });
  });

  it('should return 400 if username or password is missing', async () => {
    const responses = await Promise.all([
      request(app).post('/register').send({ username: 'testuser' }),
      request(app).post('/register').send({ password: 'testpass' })
    ]);

    for (let response of responses) {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ message: "Username and password are required" });
    }
  });

  it('should handle long inputs', async () => {
    const longUsername = 'a'.repeat(1000);
    const longPassword = 'b'.repeat(1000);
    const response = await request(app)
      .post('/register')
      .send({ username: longUsername, password: longPassword });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: "User registered successfully" });
  });
});
