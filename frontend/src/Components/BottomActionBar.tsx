import styled from "styled-components";

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

const BottomActionBar = () => {
  return (
    <StyledWrapper>
      <StyledBaseText>5 item left</StyledBaseText>
      <StyledWrapper style={{ gap: 16 }}>
        <StyledText active>All</StyledText>
        <StyledText>Active</StyledText>
        <StyledText>Completed</StyledText>
      </StyledWrapper>
      <StyledText>Clear Completed</StyledText>
    </StyledWrapper>
  );
};

export default BottomActionBar;
