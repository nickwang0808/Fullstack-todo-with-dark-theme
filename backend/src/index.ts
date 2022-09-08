import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import { body, validationResult } from "express-validator";
import Todo from "./Models/todo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/todos", async (req: Request, res: Response) => {
  const allTodos = await Todo.findAll();
  res.json(allTodos);
});

app.post(
  "/todo",
  body("name").isString(),
  body("completed").isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTodo = await Todo.create({
      name: req.body.name,
      completed: req.body.completed,
    });

    res.status(200).json(newTodo);
  }
);

app.patch(
  "./todo",
  body("id").isUUID(),
  body("completed").isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedTodo = await Todo.update(
      { completed: req.body.completed },
      { where: { id: req.body.id } }
    );
    return res.status(200).json(updatedTodo);
  }
);

app.delete(
  "/todos",
  body("ids").isArray().isUUID(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedTodo = await Todo.destroy({ where: { id: req.body.ids } });
    return res.status(200).send("delete successful");
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
