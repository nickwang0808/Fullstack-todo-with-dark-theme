import { FC, useState } from "react";
import styled from "styled-components";

import { ReactComponent as PlusIcon } from "../Assets/icon-plus.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  gap: 8px;
  margin-bottom: 16px;
  height: 32px;
  padding: 8px 16px;
  padding-left: 12px;
`;

const StyledIcon = styled(PlusIcon)`
  color: ${(props) => props.theme.primaryText};
  cursor: pointer;
`;

const TextBox = styled.input`
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.cardBg};
  color: ${(props) => props.theme.primaryText};
  height: 16px;
  width: 100%;
`;

interface AddTodoProps {
  handleAddNew: (todoName: string) => void;
}

const AddTodo: FC<AddTodoProps> = ({ handleAddNew }) => {
  const [value, setValue] = useState("");

  return (
    <Wrapper>
      <StyledIcon
        onClick={() => {
          if (value) {
            handleAddNew(value);
          }
        }}
      />

      <TextBox
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </Wrapper>
  );
};

export default AddTodo;
