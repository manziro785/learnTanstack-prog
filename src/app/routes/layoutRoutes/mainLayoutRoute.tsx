import { createRoute } from "@tanstack/react-router";
import { MainLayout } from "../../../shared/layout/MainLayout";
import { rootRoute } from "..";

export const mainLayoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "_mainLayout",
	component: MainLayout,
});
