import styled from "styled-components";

import imgDarkDesktop from "../Assets/bg-desktop-dark.jpg";
import imgLightDesktop from "../Assets/bg-desktop-light.jpg";

export const Backdrop = styled.div`
  padding-top: 50px;
  height: calc(100vh - 50px);
  background: no-repeat
    url(${({ theme }) =>
      theme.mode === "dark" ? imgDarkDesktop : imgLightDesktop});
  background-size: 100%;

  background-color: ${({ theme }) => theme.mainBg};
`;
