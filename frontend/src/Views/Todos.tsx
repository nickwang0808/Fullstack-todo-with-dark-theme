import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import TodoItem from "../Components/Todo";
import { useDeleteTodosMutation, usePatchTodoMutation } from "../Data/queries";
import { Todo } from "../Data/types";

interface TodosProps {
  todos: Required<Todo>[];
}

const Todos: FC<TodosProps> = ({ todos }) => {
  const [updateTodo] = usePatchTodoMutation();

  const [deleteTodos] = useDeleteTodosMutation();

  return (
    <>
      {todos.map(({ id, name, completed }, index) => {
        return (
          <Draggable draggableId={String(id)} index={index} key={id}>
            {(provided) => (
              <TodoItem
                value={name}
                completed={completed}
                handleComplete={(checked) =>
                  updateTodo({ todos: [{ id, completed: checked }] })
                }
                handleDelete={() => deleteTodos({ ids: [id] })}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              />
            )}
          </Draggable>
        );
      })}
    </>
  );
};

export default Todos;
