import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { router } from "./app/routes";
import './app/styles/global.css';

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} context={undefined} />
		</ThemeProvider>
	);
}

export default App;
