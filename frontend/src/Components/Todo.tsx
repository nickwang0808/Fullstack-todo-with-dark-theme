import { FC } from "react";
import styled from "styled-components";

import { ReactComponent as Cross } from "../Assets/icon-cross.svg";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  gap: 16px;
  border-bottom: 1px solid black;
`;

const StyledCheckbox = styled.input`
  accent-color: hsl(192, 100%, 67%);
`;

const StyledText = styled.div<{ strike: boolean }>`
  flex: 1;
  text-decoration: ${({ strike }) => strike && "line-through"};
  color: ${(props) => props.theme.primaryText};
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
    <StyledWrapper>
      <StyledCheckbox
        type="checkbox"
        checked={completed}
        onChange={({ target }) => handleComplete(target.checked)}
      />

      <StyledText strike={completed} data-testid="todo-item">
        {value}
      </StyledText>

      <Cross data-testid="icon-cross" onClick={handleDelete} />
    </StyledWrapper>
  );
};

export default Todo;
