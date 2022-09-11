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

export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
