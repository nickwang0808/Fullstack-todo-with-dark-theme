import express, { Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import Todo from "../models/todo";

const router = express.Router();

// in prod codebase we will be using cache like redis and use lazy loading caching strat to improve perf, here I'm gonna skip taht.
router.get("/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await Todo.findAll();
    res.json(allTodos);
  } catch (error) {
    console.error(error);
    return res.status(500).send("something went wrong on our end");
  }
});

router.post(
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

router.patch(
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

router.delete(
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

export default router;
