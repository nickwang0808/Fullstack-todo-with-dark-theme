import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBg};
`;

const StyledText = styled.div`
  color: ${(props) => props.theme.primaryText};
`;

const BottomActionBar = () => {
  return (
    <StyledWrapper>
      <StyledText>5 item left</StyledText>
      <StyledWrapper style={{ gap: 16 }}>
        <StyledText>All</StyledText>
        <StyledText>Active</StyledText>
        <StyledText>Completed</StyledText>
      </StyledWrapper>
      <StyledText>Clear Completed</StyledText>
    </StyledWrapper>
  );
};

export default BottomActionBar;
