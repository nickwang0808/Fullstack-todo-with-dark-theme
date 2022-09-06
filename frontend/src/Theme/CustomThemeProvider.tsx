import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Theme";

type themeMode = "light" | "dark";

interface CustomThemeContext {
  theme: themeMode;
  setTheme: React.Dispatch<React.SetStateAction<themeMode>>;
}

export const customThemeContext = createContext<CustomThemeContext>({
  theme: "light",
  setTheme: () => {},
});

export const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<themeMode>(getInitialTheme);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    return (savedTheme as themeMode) ?? "light";
  }

  return (
    <customThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </customThemeContext.Provider>
  );
};
