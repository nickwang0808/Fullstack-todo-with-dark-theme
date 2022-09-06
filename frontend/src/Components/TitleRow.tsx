import styled from "styled-components";

import { ReactComponent as SunIcon } from "../Assets/icon-sun.svg";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleRow = () => {
  return (
    <Row>
      <h1>TODO</h1>
      <SunIcon />
    </Row>
  );
};

export default TitleRow;
