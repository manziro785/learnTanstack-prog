import { useParams } from "@tanstack/react-router";
import React from "react";

const CommentsPage = () => {
  const { postId } = useParams({ from: "/_layout/comments/$postId" });
  return (
    <div>
      <div>
        Hello comments
        <h2>Post ID: {postId}</h2>
      </div>
    </div>
  );
};

export { CommentsPage };
