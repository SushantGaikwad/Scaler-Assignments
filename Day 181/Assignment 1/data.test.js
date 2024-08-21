const request = require("supertest");
const { app, Book } = require("./index");
const mongoose = require("mongoose");

describe("Book Management API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  let apiKey = "mysecretkey"; // Hardcoded API key for testing

  it("should fetch all books", async () => {
    try {
      const response = await request(app)
      .get("/books")
      .set("Authorization", apiKey);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    } catch (error) {
      throw new Error("fetching all books failed");
    }
  });

  it("should add a new book", async () => {
    try {
      const newBook = {
        title: "1984",
        author: "George Orwell",
        year: 1949,
      };

      const response = await request(app)
        .post("/books")
        .set("Authorization", apiKey)
        .send(newBook);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        ...newBook,
      });
    } catch (error) {
      throw new Error("Adding new Book failed");
    }
  });

  it("should fetch a single book by ID", async () => {
    try {
      const book = await Book.create({
        title: "1984",
        author: "George Orwell",
        year: 1949,
      });
      const response = await request(app)
        .get(`/books/${book._id}`)
        .set("Authorization", apiKey);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          author: expect.any(String),
          year: expect.any(Number),
        })
      );
    } catch (error) {
      throw new Error("Fetching single book by ID failed");
    }
  });

  it("should update a book by ID", async () => {
    try {
      const book = await Book.create({
        title: "1984",
        author: "George Orwell",
        year: 1949,
      });
      const updatedBook = {
        title: "Animal Farm",
      };

      const response = await request(app)
        .put(`/books/${book._id}`)
        .set("Authorization", apiKey)
        .send(updatedBook);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        ...updatedBook,
      });
    } catch (error) {
      throw new Error("Book Update by ID failed");
    }
  });

  it("should delete a book by ID", async () => {
    try {
      const book = await Book.create({
        title: "1984",
        author: "George Orwell",
        year: 1949,
      });
      const response = await request(app)
        .delete(`/books/${book._id}`)
        .set("Authorization", apiKey);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Book deleted successfully");
    } catch (error) {
      throw new Error("Book delete by Id failed");
    }
  });
});
