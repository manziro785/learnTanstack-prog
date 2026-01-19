import { TextArea, Box, Spinner, Button } from "@radix-ui/themes";
import { Label } from "@radix-ui/themes/components/data-list";
import { useState } from "react";
import { useCreatePost } from "../model/useCreatePostMutation";
import { CloudUpload, X } from "lucide-react";

const PostBlock = () => {
  const { mutate, isPending } = useCreatePost();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please, choose image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    mutate(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Create Post</h2>

      <div className="space-y-6">
        <Label className="mb-2">Caption *</Label>
        <Box className="!mt-0">
          <TextArea
            size="3"
            placeholder="Add Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full"
          />
        </Box>

        <div className="space-y-4">
          <Label className="block">
            Image *
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
                <Label
                  htmlFor="file-upload"
                  className="flex flex-col !bg-gray-800 items-center justify-center w-full h-64 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="w-[60px] h-[60px] mb-4" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload </span> or
                      drag and drop here{" "}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                  </div>
                </Label>
              </div>
            ) : (
              <div className="relative mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain rounded-lg border-2 border-gray-200"
                />
                <Button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                  title="Delete image"
                >
                  <X />
                </Button>
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">{file?.name}</p>
                  <p className="text-xs text-gray-500">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ""}
                  </p>
                </div>
              </div>
            )}
          </Label>

          {error && (
            <div className="text-red-500 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
          className="w-full bg-amber-400 text-black py-3 px-6 rounded-lg font-medium hover:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? <Spinner /> : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export { PostBlock };
