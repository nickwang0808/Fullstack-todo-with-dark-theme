import { Backdrop } from "./Components/Backdrop";
import { Container } from "./Components/Container";
import TitleRow from "./Components/TitleRow";

function App() {
  return (
    <Backdrop>
      <Container>
        <TitleRow />
      </Container>
    </Backdrop>
  );
}

export default App;
