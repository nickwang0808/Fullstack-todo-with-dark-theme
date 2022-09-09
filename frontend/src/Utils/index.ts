import { activeFilter } from "../Components/BottomActionBar";
import { Todo } from "../Data/types";

export const filterBy = (
  type: activeFilter,
  todos: Required<Todo>[]
): Required<Todo>[] => {
  switch (type) {
    case "all":
      return todos;
    case "active":
      return todos.filter((todo) => todo.completed === false);
    case "completed":
      return todos.filter((todo) => todo.completed === true);
    default:
      return todos;
  }
};
