import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { router } from "./app/routes";
import './app/styles/global.css';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/lib/QueryClient";


function App() {
	return (
		<ThemeProvider>
			    <QueryClientProvider client={queryClient}>

			<RouterProvider router={router} context={undefined} />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
