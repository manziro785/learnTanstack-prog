import requireAuth from "@/shared/lib/guards/require-auth";
import { createFileRoute } from "@tanstack/react-router";

type PageParams = {
  page: number;
};

export const Route = createFileRoute("/_layout/posts/$postId")({
  beforeLoad: requireAuth,
  component: PostCurrent,
  validateSearch: (search: Record<string, unknown>): PageParams => {
    return {
      page: Number(search.page ?? 1),
    };
  },
});

function PostCurrent() {
  const { postId } = Route.useParams();
  const { page } = Route.useSearch();
  return (
    <div>
      Hello "/posts/$postId"!
      <h2>Post ID: {postId}</h2>
      <h3>Page: {page}</h3>
    </div>
  );
}
