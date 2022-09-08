import { activeFilter } from "../Components/BottomActionBar";
import { Todo } from "../Data/todos";

export const filterBy = (type: activeFilter, todos: Todo[]): Todo[] => {
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
