import { useMemo, useState } from "react";
import AddTodo from "./Components/AddTodo";
import { Backdrop } from "./Components/Backdrop";
import BottomActionBar, { activeFilter } from "./Components/BottomActionBar";
import { Container } from "./Components/Container";
import TitleRow from "./Components/TitleRow";
import Todo from "./Components/Todo";
import { dummyTodos } from "./Data/todos";
import { filterBy } from "./Utils";

function App() {
  const [filter, setFilter] = useState<activeFilter>("all");

  const [todos, setTodos] = useState(dummyTodos);

  const todosFilterd = useMemo(() => filterBy(filter, todos), [filter, todos]);

  return (
    <Backdrop>
      <Container>
        <TitleRow />
        <AddTodo />
        {todosFilterd.map(({ name, completed }) => {
          return (
            <Todo
              key={name}
              value={name}
              completed={completed}
              handleComplete={() => {}}
              handleDelete={() => {}}
            />
          );
        })}
        <BottomActionBar
          itemsCount={todosFilterd.length}
          handleClickAll={() => setFilter("all")}
          handleClickActive={() => setFilter("active")}
          handleClickComplete={() => setFilter("completed")}
          handleClickClear={() => {}}
          activeFilter={filter}
        />
      </Container>
    </Backdrop>
  );
}

export default App;
