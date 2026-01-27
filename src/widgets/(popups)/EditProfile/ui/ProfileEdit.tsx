import { useGetProfileQuery } from "@/widgets/ProfileInfo/model/useProfile";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { usePutProfileMutaion } from "../model/useProfile";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import type { UserType } from "@/entities/user/user";

const DialogDemo = () => {
  const { data } = useGetProfileQuery();
  const { mutate, isPending } = usePutProfileMutaion();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: {
      username: "",
      full_name: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        username: data.username || "",
        full_name: data.full_name || "",
        bio: data.bio || "",
      });
    }
  }, [data, reset]);

  const avatarFile = watch("avatar");
  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [avatarFile]);

  const onSubmit = (formData: UserType) => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("full_name", formData.full_name);
    data.append("bio", formData.bio);

    if (formData.avatar && formData.avatar.length > 0) {
      data.append("avatar_url", formData.avatar[0]);
    }

    mutate(data as any, {
      onSuccess: () => {
        setOpen(false);
        setPreview(null);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button className="!bg-gray-400 hover:!bg-amber-400 active:!bg-amber-400 hover:text-black duration-200 !cursor-pointer text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2">
          Edit
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        maxWidth="450px"
        className="max-h-[85vh] overflow-y-auto w-[calc(100vw-2rem)] md:w-full mx-4"
      >
        <Dialog.Title className="text-lg md:text-xl">Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4" className="text-sm md:text-base">
          Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3" className="pb-2">
          {preview && (
            <div className="flex justify-center mb-2">
              <img
                src={preview ?? data.avatar_url}
                alt="Preview"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}

          <Controller
            name="avatar"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <div>
                <Text
                  as="div"
                  size="2"
                  mb="1"
                  weight="bold"
                  className="text-sm md:text-base"
                >
                  Avatar
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                  className="w-full text-sm md:text-base"
                />
              </div>
            )}
          />

          <label>
            <Text
              as="div"
              size="2"
              mb="1"
              weight="bold"
              className="text-sm md:text-base"
            >
              Username
            </Text>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <TextField.Root
                  {...field}
                  placeholder="Enter your username"
                  className="text-sm md:text-base"
                />
              )}
            />
            {errors.username && (
              <Text size="1" color="red" className="text-xs md:text-sm mt-1">
                {errors.username.message}
              </Text>
            )}
          </label>

          <label>
            <Text
              as="div"
              size="2"
              mb="1"
              weight="bold"
              className="text-sm md:text-base"
            >
              Full name
            </Text>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <TextField.Root
                  {...field}
                  placeholder="Enter your full name"
                  className="text-sm md:text-base"
                />
              )}
            />
          </label>

          <label>
            <Text
              as="div"
              size="2"
              mb="1"
              weight="bold"
              className="text-sm md:text-base"
            >
              Bio
            </Text>
            <Controller
              name="bio"
              control={control}
              rules={{
                maxLength: {
                  value: 500,
                  message: "Bio must be less than 500 characters",
                },
              }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Enter about you"
                  className="text-sm md:text-base"
                  rows={3}
                />
              )}
            />
            {errors.bio && (
              <Text size="1" color="red" className="text-xs md:text-sm mt-1">
                {errors.bio.message}
              </Text>
            )}
          </label>
        </Flex>

        <Flex gap="2" mt="4" justify="end" className="flex-wrap md:gap-3">
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
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 min-w-[80px]"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { DialogDemo };
