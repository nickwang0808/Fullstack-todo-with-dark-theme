import { useMemo, useState } from "react";
import AddTodo from "./Components/AddTodo";
import { Backdrop } from "./Components/Backdrop";
import BottomActionBar, { activeFilter } from "./Components/BottomActionBar";
import { Container } from "./Components/Container";
import TitleRow from "./Components/TitleRow";
import Todo from "./Components/Todo";
import {
  useDeleteTodosMutation,
  useGetAllTodosQuery,
  usePatchTodoMutation,
  usePostTodoMutation,
} from "./Data/queries";
import { filterBy } from "./Utils";

function App() {
  const [filter, setFilter] = useState<activeFilter>("all");

  const { data, isLoading, isError } = useGetAllTodosQuery();

  const [addNewTodo] = usePostTodoMutation();

  const [updateTodo] = usePatchTodoMutation();

  const [deleteTodos] = useDeleteTodosMutation();

  const handleAddNewTodo = async (value: string) => {
    await addNewTodo({
      name: value,
    });
  };

  const handleClearCompleted = () => {
    if (!data || data.length === 0) return;
    deleteTodos({ ids: filterBy("completed", data).map((elem) => elem.id) });
  };

  const todosFilterd = useMemo(
    () => filterBy(filter, data ?? []),
    [filter, data]
  );

  return (
    <Backdrop>
      <Container>
        <TitleRow />
        <AddTodo handleAddNew={(value) => handleAddNewTodo(value)} />
        {todosFilterd.map(({ id, name, completed }) => {
          return (
            <Todo
              key={id}
              value={name}
              completed={completed}
              handleComplete={(checked) =>
                updateTodo({ id, completed: checked })
              }
              handleDelete={() => deleteTodos({ ids: [id] })}
            />
          );
        })}
        <BottomActionBar
          itemsCount={todosFilterd.length}
          handleClickAll={() => setFilter("all")}
          handleClickActive={() => setFilter("active")}
          handleClickComplete={() => setFilter("completed")}
          handleClickClear={handleClearCompleted}
          activeFilter={filter}
        />
      </Container>
    </Backdrop>
  );
}

export default App;
