import styled from "styled-components";

import imgDarkDesktop from "../Assets/bg-desktop-dark.jpg";
import imgLightDesktop from "../Assets/bg-desktop-light.jpg";

import imgDarkMobile from "../Assets/bg-mobile-dark.jpg";
import imgLightMobile from "../Assets/bg-mobile-light.jpg";

export const Backdrop = styled.div`
  padding-top: 50px;
  height: calc(100vh - 50px);
  background-color: ${({ theme }) => theme.mainBg};
  background-size: 100%;
  background-repeat: no-repeat;

  @media (max-width: 700px) {
    background-image: url(${({ theme }) =>
      theme.mode === "dark" ? imgDarkMobile : imgLightMobile});
  }

  background-image: url(${({ theme }) =>
    theme.mode === "dark" ? imgDarkDesktop : imgLightDesktop});
`;
