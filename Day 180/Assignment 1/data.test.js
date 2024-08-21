const request = require("supertest");
const app = require("./index");

describe('Request Logger Middleware', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should log the HTTP method and a timestamp for each request', async () => {
    const response = await request(app).get('/');
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('GET request received'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('T'));
  });
});