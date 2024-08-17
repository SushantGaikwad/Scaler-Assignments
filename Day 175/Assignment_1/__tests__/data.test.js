const request = require("supertest");
const { app, Product } = require("../index");
const mongoose = require("mongoose");

jest.mock("../index", () => {
  const actualModule = jest.requireActual("../index");
  return {
    ...actualModule,
    Product: {
      find: jest.fn().mockResolvedValueOnce([]), // Mock empty products initially
      create: jest.fn(),
    },
  };
});

describe("Express Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it("POST /products should create a new product with valid data", async () => {
    const newProductData = {
      name: "Smartphone",
      brand: "XYZ",
      price: 699,
      specs: {
        display: "6.5 inches",
        storage: "128GB",
        camera: "Quad-camera setup",
      },
    };

    Product.create.mockResolvedValue(newProductData);

    const response = await request(app)
      .post("/products")
      .send(newProductData)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(newProductData.name);
    expect(response.body.brand).toBe(newProductData.brand);
    expect(response.body.price).toBe(newProductData.price);
    expect(response.body.specs).toEqual(newProductData.specs);
  }, 1000);

  it("POST /products should return an error with invalid data", async () => {
    const invalidProductData = {
      name: "",
      brand: "XYZ",
      price: -10,
      specs: {},
    };

    const response = await request(app)
      .post("/products")
      .send(invalidProductData)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
  }, 1000);

  it("GET /products should return all products after inserting", async () => {
    const mockProducts = [
      {
        name: "Test Product 1",
        brand: "Test Brand",
        price: 100,
        specs: { testSpec: "Test Spec" },
      },
      {
        name: "Test Product 2",
        brand: "Test Brand",
        price: 200,
        specs: { testSpec: "Test Spec" },
      },
    ];

    Product.find.mockResolvedValue(mockProducts);
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  }, 1000);
});
