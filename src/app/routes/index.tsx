import { createRootRoute, createRouter, Outlet } from "@tanstack/react-router";
import { mainLayoutRoute } from "./layoutRoutes/mainLayoutRoute";
import { mainPageRoute, postsPageRoute } from "./mainLayout";

// Root route
export const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

// Собираем дерево
const routeTree = rootRoute.addChildren([
	mainLayoutRoute.addChildren([mainPageRoute, postsPageRoute]),
]);

// Создаем роутер
export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});
