import express, { Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import { Todo } from "../models";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Root resource of the app");
});

// in prod codebase we will be using cache like redis and use lazy loading caching strat to improve perf, here I'm gonna skip taht.
router.get("/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await await Todo.findAll({
      order: [["order", "ASC"]],
    });
    res.status(200).json(allTodos);
  } catch (error) {
    console.error(error);
    return res.status(500).send("something went wrong on our end");
  }
});

router.post(
  "/todos",
  body("name").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todoCounts = await Todo.count();

      const newTodo = await Todo.create({
        name: req.body.name,
        order: todoCounts,
      });
      return res.status(200).json(newTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

router.patch(
  "/todos",
  body("*.id").isInt(),
  body("*.completed").isBoolean(),
  body("*.order").isInt().optional({ nullable: true }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await Promise.all(
        (req.body as Todo[]).map(async ({ completed, id, order }) => {
          if (order != null) {
            await Todo.update({ completed, order }, { where: { id } });
          } else {
            await Todo.update({ completed }, { where: { id } });
          }
        })
      );
      return res.status(200).send("update successful");
    } catch (error) {
      console.error(error);
      return res.status(500).send("something went wrong on our end");
    }
  }
);

router.delete(
  "/todos",
  body("ids").isArray(),
  check("ids.*").isInt(),
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
