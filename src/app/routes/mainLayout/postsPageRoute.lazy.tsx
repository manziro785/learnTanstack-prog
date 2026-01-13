import { createLazyRoute } from "@tanstack/react-router";
import { PostsPage } from "../../../pages/PostsPage";

export const postsPageRoute = createLazyRoute("/_mainLayout/posts")({
	component: PostsPage,
});
