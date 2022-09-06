import { Backdrop } from "./Components/Backdrop";
import { Container } from "./Components/Container";
import TitleRow from "./Components/TitleRow";
import Todo from "./Components/Todo";
import { todos } from "./Data/todos";

function App() {
  return (
    <Backdrop>
      <Container>
        <TitleRow />
        {todos.map(({ name, completed }) => {
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
      </Container>
    </Backdrop>
  );
}

export default App;
