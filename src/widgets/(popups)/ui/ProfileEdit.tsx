import { useGetProfileQuery } from "@/widgets/ProfileInfo/model/useGetProfileQuery";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { usePutProfileMutaion } from "../model/usePutProfileMutation";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

type ProfileFormData = {
  username: string;
  full_name: string;
  bio: string;
  avatar?: FileList;
};

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
  } = useForm<ProfileFormData>({
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

  const onSubmit = (formData: ProfileFormData) => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("full_name", formData.full_name);
    data.append("bio", formData.bio);

    if (formData.avatar && formData.avatar.length > 0) {
      data.append("avatar", formData.avatar[0]);
    }

    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        setPreview(null);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button className="!bg-gray-400 hover:!bg-amber-400 hover:text-black duration-200 !cursor-pointer">
          Edit
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {preview && (
            <div className="flex justify-center mb-2">
              <img
                src={preview ?? data.avatar_url}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}

          <Controller
            name="avatar"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <div>
                <Text as="div" size="2" mb="1" weight="bold">
                  Avatar
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                  className="w-full"
                />
              </div>
            )}
          />

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
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
                <TextField.Root {...field} placeholder="Enter your username" />
              )}
            />
            {errors.username && (
              <Text size="1" color="red">
                {errors.username.message}
              </Text>
            )}
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Full name
            </Text>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <TextField.Root {...field} placeholder="Enter your full name" />
              )}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
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
                <TextArea {...field} placeholder="Enter about you" />
              )}
            />
            {errors.bio && (
              <Text size="1" color="red">
                {errors.bio.message}
              </Text>
            )}
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" type="button">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogDemo;
