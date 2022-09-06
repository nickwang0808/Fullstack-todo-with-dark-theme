import { createGlobalStyle } from "styled-components";

export interface Theme {
  mode: "light" | "dark";
  mainBg: string;
  cardBg: string;
  primaryText: string;
  secondaryText: string;
}

export const lightTheme: Theme = {
  mode: "light",
  mainBg: "hsl(0, 0%, 98%)",
  cardBg: "hsl(236, 33%, 92%)",
  // LightGrayishBlue: "hsl(233, 11%, 84%)",
  secondaryText: "hsl(236, 9%, 61%)",
  primaryText: "hsl(235, 19%, 35%)",
};

export const darkTheme: Theme = {
  mode: "dark",
  mainBg: "hsl(235, 21%, 11%)",
  cardBg: "hsl(235, 24%, 19%)",
  primaryText: "hsl(234, 39%, 85%)",
  // LightGrayishBlueHover: "hsl(236, 33%, 92%)",
  secondaryText: "hsl(234, 11%, 52%)",
  // VeryDarkGrayishBlue: "hsl(233, 14%, 35%)",
  // VeryDarkGrayishBlue2: "hsl(237, 14%, 26%)",
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Josefin Sans;
    src: url(https://fonts.google.com/specimen/Josefin+Sans);
    font-weight: 400 700
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Josefin Sans, Open-Sans, Helvetica, Sans-Serif;
  }
`;
