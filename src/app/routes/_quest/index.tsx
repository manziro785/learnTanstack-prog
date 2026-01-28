import { HeroPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_quest/")({
  component: HeroPage,
});
