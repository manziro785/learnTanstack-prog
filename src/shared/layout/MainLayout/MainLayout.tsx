import { Outlet } from "@tanstack/react-router";
import { type PropsWithChildren, Suspense } from "react";

export const MainLayoutWrapper = (props: PropsWithChildren) => {
	const { children } = props;
	return (
		<Suspense fallback={"Loading..."}>
			<Suspense fallback={"Loading..."}>{children}</Suspense>{" "}
		</Suspense>
	);
};

const MainLayout = () => {
	return (
		<MainLayoutWrapper>
			<Outlet />
		</MainLayoutWrapper>
	);
};

export default MainLayout;
