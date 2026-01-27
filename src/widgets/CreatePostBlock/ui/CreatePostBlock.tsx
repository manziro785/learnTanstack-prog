import { TextArea, Box, Spinner, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useCreatePost } from "../model/useCreatePostMutation";
import { CloudUpload, X, Hash } from "lucide-react";

const CreatePostBlock = () => {
  const { mutate, isPending } = useCreatePost();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError("");

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/\s+/g, " ");

    setHashtags(value);
  };

  const formatHashtagsForDisplay = (value: string) => {
    if (!value.trim()) return "";

    return value
      .trim()
      .split(/\s+/)
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
      .join(" ");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please, choose image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    if (hashtags.trim()) {
      const formattedHashtags = formatHashtagsForDisplay(hashtags);
      formData.append("hashtags", formattedHashtags);
    }

    mutate(formData as any);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
        Create Post
      </h2>

      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block mb-2 font-medium text-sm md:text-base">
            Caption *
          </label>
          <Box className="!mt-0">
            <TextArea
              size="3"
              placeholder="Add Caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full text-sm md:text-base"
              rows={4}
            />
          </Box>
        </div>

        <div>
          <label className="block mb-2 font-medium text-sm md:text-base">
            Hashtags
          </label>
          <Box className="!mt-0">
            <TextField.Root
              size="3"
              placeholder="travel nature photography"
              value={hashtags}
              onChange={handleHashtagsChange}
              className="w-full text-sm md:text-base"
            >
              <TextField.Slot>
                <Hash className="w-3 h-3 md:w-4 md:h-4" />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <p className="text-xs text-gray-500 mt-1">
            Separate hashtags with spaces (# will be added automatically)
          </p>

          {hashtags.trim() && (
            <div className="mt-2 text-xs md:text-sm text-gray-400">
              Preview: {formatHashtagsForDisplay(hashtags)}
            </div>
          )}
        </div>

        <div className="space-y-3 md:space-y-4">
          <label className="block font-medium text-sm md:text-base">
            Image *
          </label>
          {!preview ? (
            <div className="relative mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                required
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col bg-gray-800 items-center justify-center w-full h-48 md:h-64 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-400 transition-colors active:bg-gray-700 md:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  <CloudUpload className="w-12 h-12 md:w-[60px] md:h-[60px] mb-3 md:mb-4 text-gray-400" />
                  <p className="mb-2 text-xs md:text-sm text-gray-400 text-center">
                    <span className="font-semibold">Click to upload </span>
                    <span className="hidden md:inline">
                      or drag and drop here
                    </span>
                    <span className="md:hidden">an image</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="relative mt-2">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto max-h-64 md:max-h-96 object-contain rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-800 text-white rounded-full p-1.5 md:p-2 hover:bg-red-600 active:bg-red-600 transition-colors shadow-lg"
                title="Delete image"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-xs md:text-sm font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full flex justify-center items-center bg-amber-400 text-black py-3 md:py-3 px-6 rounded-lg font-medium text-sm md:text-base hover:bg-amber-500 active:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors min-h-[48px]"
        >
          {isPending ? <Spinner /> : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export { CreatePostBlock };
