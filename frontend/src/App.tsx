import { useMemo, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddTodo from "./Components/AddTodo";
import { Backdrop } from "./Components/Backdrop";
import BottomActionBar, { activeFilter } from "./Components/BottomActionBar";
import { Container } from "./Components/Container";
import TitleRow from "./Components/TitleRow";
import {
  useDeleteTodosMutation,
  useGetAllTodosQuery,
  usePostTodoMutation,
} from "./Data/queries";
import { filterBy } from "./Utils";
import Todos from "./Views/Todos";

function App() {
  const [filter, setFilter] = useState<activeFilter>("all");

  const { data, isLoading, isError } = useGetAllTodosQuery();

  const [addNewTodo] = usePostTodoMutation();

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

  if (isLoading) {
    // return loading view
  }
  if (isError) {
    // return error view
  }
  return (
    <Backdrop>
      <Container>
        <TitleRow />
        <AddTodo handleAddNew={(value) => handleAddNewTodo(value)} />

        <DragDropContext onDragEnd={() => console.log("drag end")}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Todos todos={todosFilterd} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
