import { Sequelize } from "sequelize";
import request from "supertest";
import { app, server } from "..";
import { sequelize, Todo } from "../models";

describe("Todo routes should work", () => {
  let db: Sequelize = sequelize;

  beforeAll(async () => {
    await db.sync({ force: true });
    await seedDb();
  });

  test("Get should work", async () => {
    const response = await request(app).get("/todos");
    expect(response.body).toHaveLength(4);
  });
  test("POST with valid input should return 200, and add a new record", async () => {
    const responsePost = await await request(app).post("/todo").send({
      name: "test 5",
    });
    const responseGet = await request(app).get("/todos");

    expect(responsePost.body.name).toBe("test 5");

    expect(responsePost.status).toBe(200);

    expect(responseGet.body).toHaveLength(5);
  });
  test("POST with invalid input should return 400", async () => {
    const response = await request(app).post("/todo").send({
      notName: "test 5",
    });
    expect(response.status).toBe(400);
  });

  test("PATCH with valid input should return 200, and updated record", async () => {
    const responseGet1 = await request(app).get("/todos");
    const { id } = responseGet1.body[0];
    expect(id).toBeDefined();

    const responsePatch = await request(app).patch("/todo").send({
      id,
      completed: true,
    });
    expect(responsePatch.status).toBe(200);
    const responseGet2 = await request(app).get("/todos");
    expect(responseGet2.body[0]?.completed).toBe(true);
  });
  test("PATCH with invalid input should return 400", async () => {
    const response = await request(app).patch("/todo").send({
      notName: "test 5",
    });
    expect(response.status).toBe(400);
  });
  test("Delete with invalid input should return 400", async () => {
    const response = await request(app).delete("/todos").send({
      id: "1",
    });
    expect(response.status).toBe(400);
  });
  test("Delete with valid input should return 200, and delete related records", async () => {
    const response = await request(app)
      .delete("/todos")
      .send({
        ids: [1, 2, 3, 4, 5],
      });
    expect(response.status).toBe(200);

    const responseGet = await request(app).get("/todos");
    expect(responseGet.body).toHaveLength(0);
  });

  afterAll(async () => {
    await db.close();
    server.close();
  });
});

async function seedDb() {
  await Todo.bulkCreate([
    {
      name: "todo 1",
      completed: true,
    },
    {
      name: "todo 2",
      completed: true,
    },
    {
      name: "todo 3",
      completed: false,
    },
    {
      name: "todo 4",
      completed: false,
    },
  ]);
}
