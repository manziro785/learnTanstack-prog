import { useDeletePostById } from "@/entities/post/model/usePost";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { CircleX } from "lucide-react";
import React, { useState } from "react";

interface DeletePostProps {
  postId: number;
  onSuccess?: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const { mutate: deletePost, isPending } = useDeletePostById(postId);

  const handleDelete = () => {
    deletePost(undefined, {
      onSuccess: () => {
        setOpen(false);
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Failed to delete post:", error);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <CircleX className="w-8 h-8 md:w-10 md:h-10 absolute left-2 bottom-2 md:left-3 md:bottom-3 text-gray-400 hover:text-red-400 active:text-red-400 duration-200 cursor-pointer" />
      </Dialog.Trigger>

      <Dialog.Content
        maxWidth="450px"
        className="w-[calc(100vw-2rem)] md:w-full mx-4"
      >
        <Dialog.Title className="text-lg md:text-xl">Delete Post</Dialog.Title>
        <Dialog.Description size="2" mb="4" className="text-sm md:text-base">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </Dialog.Description>
        <Flex gap="2" md:gap="3" mt="4" justify="end" className="flex-wrap">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              type="button"
              className="text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 min-w-[80px]"
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            color="red"
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 min-w-[80px]"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { DeletePost };
