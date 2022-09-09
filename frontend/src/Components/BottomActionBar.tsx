import { FC } from "react";
import styled from "styled-components";
import useWindowDimensions from "../Utils/useScreenSize";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.cardBg};
  height: 32px;
  padding: 8px 16px;
`;

const StyledBaseText = styled.div`
  color: ${(props) => props.theme.secondaryText};
  cursor: pointer;
`;

const StyledText = styled(StyledBaseText)<{ active?: boolean }>`
  &:hover {
    color: ${({ theme, active }) => !active && theme.primaryText};
  }
  ${({ active }) => active && "color: blue"};
`;

export type activeFilter = "all" | "active" | "completed";

interface BottomActionBarProps {
  itemsCount: number;
  activeFilter: activeFilter;
  handleClickAll: () => void;
  handleClickActive: () => void;
  handleClickComplete: () => void;
  handleClickClear: () => void;
}

const BottomActionBar: FC<BottomActionBarProps> = ({
  itemsCount,
  handleClickAll,
  handleClickActive,
  handleClickComplete,
  handleClickClear,
  activeFilter,
}) => {
  const windowDimension = useWindowDimensions();

  if (windowDimension.width < 700) {
    return (
      <>
        <StyledWrapper style={{ marginTop: 0 }}>
          <StyledBaseText>{itemsCount} item left</StyledBaseText>
          <StyledText onClick={handleClickClear}>Clear Completed</StyledText>
        </StyledWrapper>
        <StyledWrapper
          style={{ gap: 16, justifyContent: "center", marginTop: 16 }}
        >
          <StyledText onClick={handleClickAll} active={activeFilter === "all"}>
            All
          </StyledText>
          <StyledText
            onClick={handleClickActive}
            active={activeFilter === "active"}
          >
            Active
          </StyledText>
          <StyledText
            onClick={handleClickComplete}
            active={activeFilter === "completed"}
          >
            Completed
          </StyledText>
        </StyledWrapper>
      </>
    );
  }

  return (
    <StyledWrapper>
      <StyledBaseText>{itemsCount} item left</StyledBaseText>
      <StyledWrapper style={{ gap: 16 }}>
        <StyledText onClick={handleClickAll} active={activeFilter === "all"}>
          All
        </StyledText>
        <StyledText
          onClick={handleClickActive}
          active={activeFilter === "active"}
        >
          Active
        </StyledText>
        <StyledText
          onClick={handleClickComplete}
          active={activeFilter === "completed"}
        >
          Completed
        </StyledText>
      </StyledWrapper>
      <StyledText onClick={handleClickClear}>Clear Completed</StyledText>
    </StyledWrapper>
  );
};

export default BottomActionBar;
