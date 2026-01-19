import { Theme } from "@radix-ui/themes";
import { createContext, useState } from "react";
import type {
  ThemeContextValue,
  ThemeMode,
  ThemeProviderProps,
} from "./ThemeProviderTypes";

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme appearance={theme} accentColor="amber" radius="large">
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
