import type { ReactNode } from "react";

export interface ThemeProviderProps {
	children: ReactNode;
}

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
	theme: ThemeMode;
	toggleTheme: () => void;
}
