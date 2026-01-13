import { createRoute } from "@tanstack/react-router";
import { PostsPage } from "../../../pages";
import { mainLayoutRoute } from "../layoutRoutes/mainLayoutRoute";

export const postsPageRoute = createRoute({
	getParentRoute: () => mainLayoutRoute,
	path: "/posts",
	component: PostsPage,
});
