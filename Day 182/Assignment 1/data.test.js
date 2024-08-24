const request = require("supertest");
const mongoose = require("mongoose");
const { app, Note } = require("./index");

jest.mock("", () => {
  const actualModels = jest.requireActual("");
  return {
    ...actualModels,
    Note: {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      create: jest.fn(),
    },
  };
});

describe("Note Taking API Tests", () => {
  let createdNoteId;

  beforeAll(async () => {
    const noteResponse = await request(app)
      .post("/notes")
      .send({
        title: "Test Note",
        content: "This is a test note content.",
      })
      .set("Authorization", "mysecretkey")
      .set("Accept", "application/json");

    expect(noteResponse.status).toBe(201);
    createdNoteId = noteResponse.body._id;
  });

  afterAll(async () => {
    if (createdNoteId) {
      await request(app)
        .delete(`/notes/${createdNoteId}`)
        .set("Authorization", "mysecretkey");
    }
    await mongoose.disconnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST /notes should create a new note with valid data", async () => {
    const newNoteData = {
      title: "Test Note 2",
      content: "This is another test note.",
    };

    const response = await request(app)
    .post("/notes")
    .send(newNoteData)
    .set("Authorization", "mysecretkey")
    .set("Accept", "application/json");
    console.log(">>>   response:", response);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(newNoteData.title);
    expect(response.body.content).toBe(newNoteData.content);
  });

  it("GET /notes should return all notes", async () => {
    const response = await request(app)
      .get("/notes")
      .set("Authorization", "mysecretkey");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("PUT /notes/:id should update a note by its ID", async () => {
    const updateData = {
      title: "Updated Test Note",
      content: "This is the updated content of the test note.",
    };

    const response = await request(app)
      .put(`/notes/${createdNoteId}`)
      .send(updateData)
      .set("Authorization", "mysecretkey")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updateData.title);
    expect(response.body.content).toBe(updateData.content);
  });

  it("DELETE /notes/:id should delete a note by its ID", async () => {
    const response = await request(app)
      .delete(`/notes/${createdNoteId}`)
      .set("Authorization", "mysecretkey");

    expect(response.status).toBe(200);
    expect(response.body.message).toContain("Note deleted successfully");

    const fetchDeletedResponse = await request(app)
      .get(`/notes/${createdNoteId}`)
      .set("Authorization", "mysecretkey");

    expect(fetchDeletedResponse.status).toBe(404);
  });
});
