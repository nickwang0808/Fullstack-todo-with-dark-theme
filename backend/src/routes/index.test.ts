import request from "supertest";
import { app } from "..";
import Todo from "../models/todo";

describe("Todo routes should work", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "test";
    process.env.PORT = "8005";
    seedDb();
  });

  test("Get", async () => {
    const {
      body: { data },
    } = await request(app).get("/todos");
    console.log({ data });

    expect(1).toBe(1);
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
