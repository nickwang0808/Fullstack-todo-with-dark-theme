import { FC, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  gap: 16px;
`;

const CheckBox = styled.input``;

const TextBox = styled.input`
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.cardBg};
  color: ${(props) => props.theme.primaryText};
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
