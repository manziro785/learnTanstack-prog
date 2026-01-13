import { createRoute } from "@tanstack/react-router";
import { MainPage } from "../../../pages";
import { mainLayoutRoute } from "../layoutRoutes/mainLayoutRoute";

export const mainPageRoute = createRoute({
	getParentRoute: () => mainLayoutRoute,
	path: "/",
	component: MainPage,
});
