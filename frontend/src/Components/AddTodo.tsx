import { FC, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
`;

const CheckBox = styled.input`
  accent-color: hsl(192, 100%, 67%);
`;

const TextBox = styled.input`
  border: none;
  outline: none;
`;

const AddTodo: FC = () => {
  const [value, setValue] = useState("");

  return (
    <Wrapper>
      <CheckBox readOnly type="checkbox" checked={false} />

      <TextBox
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </Wrapper>
  );
};

export default AddTodo;
