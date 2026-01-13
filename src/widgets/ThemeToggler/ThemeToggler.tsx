import { Button } from "@radix-ui/themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../app/providers/ThemeProvider/useTheme";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button onClick={toggleTheme} variant="soft" size="2">
			{theme === "dark" ? <Sun /> : <Moon />}
		</Button>
	);
};

export default ThemeToggle;
