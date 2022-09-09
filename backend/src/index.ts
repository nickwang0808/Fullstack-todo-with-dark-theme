import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import { body, check, validationResult } from "express-validator";
import Todo from "./models/todo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// in prod codebase we will be using cache like redis and use lazy loading caching strat to improve perf, here I'm gonna skip taht.
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await Todo.findAll();
    res.json(allTodos);
  } catch (error) {
    console.error(error);
    return res.status(500).send("something went wrong on our end");
  }
});

app.post(
  "/todo",
  body("name").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTodo = await Todo.create({
        name: req.body.name,
      });
      return res.status(200).json(newTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

app.patch(
  "/todo",
  body("id").isUUID(),
  body("completed").isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedTodo = await Todo.update(
        { completed: req.body.completed },
        { where: { id: req.body.id } }
      );
      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

app.delete(
  "/todos",
  body("ids").isArray(),
  check("ids.*").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await Todo.destroy({ where: { id: req.body.ids } });
      return res.status(200).send("delete successful");
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
