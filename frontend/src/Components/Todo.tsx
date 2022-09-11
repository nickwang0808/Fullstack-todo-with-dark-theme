import { forwardRef } from "react";
import styled from "styled-components";

import { ReactComponent as Cross } from "../Assets/icon-cross.svg";
import CustomCheckBox from "./CustomCheckBox";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.cardSecondaryBg};
  height: 32px;
  padding: 8px 16px;
`;

const StyledText = styled.div<{ completed: boolean }>`
  flex: 1;
  text-decoration: ${({ completed }) => completed && "line-through"};
  color: ${({ theme, completed }) =>
    completed ? theme.secondaryText : theme.primaryText};
`;

interface ItemProps {
  completed: boolean;
  handleComplete: (checked: boolean) => void;
  value: string;
  handleDelete: () => void;
}

const TodoItem = forwardRef<any, ItemProps>(
  ({ completed, handleComplete, value, handleDelete, ...props }, ref) => {
    return (
      <StyledWrapper {...props} ref={ref}>
        <CustomCheckBox
          checked={completed}
          onChange={(checked) => handleComplete(checked)}
        />

        <StyledText completed={completed} data-testid="todo-item">
          {value}
        </StyledText>

        <Cross
          style={{ cursor: "pointer" }}
          data-testid="icon-cross"
          onClick={handleDelete}
        />
      </StyledWrapper>
    );
  }
);

export default TodoItem;
