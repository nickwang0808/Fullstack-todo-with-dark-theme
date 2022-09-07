import { useContext } from "react";
import styled from "styled-components";

import { ReactComponent as MoonIcon } from "../Assets/icon-moon.svg";
import { ReactComponent as SunIcon } from "../Assets/icon-sun.svg";
import { customThemeContext } from "../Theme/CustomThemeProvider";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledH1 = styled.h1`
  color: white;
`;

const TitleRow = () => {
  const { theme, setTheme } = useContext(customThemeContext);

  return (
    <Row>
      <StyledH1>TODO</StyledH1>
      {theme === "dark" ? (
        <SunIcon onClick={() => setTheme("light")} />
      ) : (
        <MoonIcon onClick={() => setTheme("dark")} />
      )}
    </Row>
  );
};

export default TitleRow;
