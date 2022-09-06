import { FC } from "react";
import styled from "styled-components";

import { ReactComponent as Cross } from "../Assets/icon-cross.svg";

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

interface ItemProps {
  completed: boolean;
  handleComplete: (checked: boolean) => void;
  value: string;
  handleDelete: () => void;
}

const Todo: FC<ItemProps> = ({
  completed,
  handleComplete,
  value,
  handleDelete,
}) => {
  return (
    <Wrapper>
      <CheckBox
        type="checkbox"
        checked={completed}
        onChange={({ target }) => handleComplete(target.checked)}
      />

      <div
        data-testid="todo-item"
        style={completed ? { textDecoration: "line-through" } : undefined}
      >
        {value}
      </div>

      <Cross data-testid="icon-cross" onClick={handleDelete} />
    </Wrapper>
  );
};

export default Todo;
