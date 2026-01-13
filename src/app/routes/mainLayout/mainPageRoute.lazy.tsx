import { createLazyRoute } from "@tanstack/react-router";
import { MainPage } from "../../../pages";

export const mainPageRoute = createLazyRoute("/_mainLayout/")({
	component: MainPage,
});
