import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  max-width: 500px;
  @media (max-width: 700px) {
    width: 90%;
  }
  display: flex;
  flex-direction: column;
`;
