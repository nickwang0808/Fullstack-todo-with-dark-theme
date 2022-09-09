import { FC, PropsWithChildren } from "react";
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

  const ActionControlBar: FC<PropsWithChildren> = ({ children }) => {
    return (
      <StyledWrapper style={{ marginTop: 0 }}>
        <StyledBaseText data-testid="item-counter">
          {itemsCount} item left
        </StyledBaseText>
        {children}
        <StyledText onClick={handleClickClear}>Clear Completed</StyledText>
      </StyledWrapper>
    );
  };

  const FIlterControlBar: FC<{ isSerperate: boolean }> = ({ isSerperate }) => {
    const wrapperStyleAddon = isSerperate
      ? {
          justifyContent: "center",
          marginTop: 16,
          gap: 16,
        }
      : { gap: 16 };

    return (
      <StyledWrapper style={wrapperStyleAddon}>
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
    );
  };

  if (windowDimension.width < 700) {
    return (
      <>
        <ActionControlBar />
        <FIlterControlBar isSerperate />
      </>
    );
  }

  return (
    <ActionControlBar>
      <FIlterControlBar isSerperate={false} />
    </ActionControlBar>
  );
};

export default BottomActionBar;
