import { useForm, type SubmitHandler } from "react-hook-form";
import type { AuthFormProps, LoginUser, RegisterUser } from "../model/auth";
import { useAuth } from "../model/useAuthMutaion";
import { Spinner } from "@radix-ui/themes";
import { useState } from "react";

export default function AuthForm({ tab }: AuthFormProps) {
  const { submitAuth } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginUser | RegisterUser>();

  const password = watch("password");

  const onSubmit: SubmitHandler<LoginUser | RegisterUser> = async (data) => {
    try {
      setServerError(null);
      if (
        "confirm_password" in data &&
        data.confirm_password !== data.password
      ) {
        setError("confirm_password", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      const { confirm_password: _, ...submitData } = data;
      await submitAuth(submitData, tab);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full px-4 md:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-5"
      >
        {serverError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm md:text-base">
            {serverError}
          </div>
        )}

        <div className="space-y-1.5 md:space-y-2">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
            className="w-full px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors text-sm md:text-base"
          />
          {errors.email && (
            <p className="text-red-500 text-xs md:text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {tab === "register" && (
          <>
            <div className="space-y-1.5 md:space-y-2">
              <input
                type="text"
                placeholder="Full name"
                {...register("full_name", {
                  required: tab === "register" ? "Full name required" : false,
                })}
                className="w-full px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors text-sm md:text-base"
              />
              {"full_name" in errors && errors.full_name && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: tab === "register" ? "Nickname required" : false,
                })}
                className="w-full px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors text-sm md:text-base"
              />
              {"username" in errors && errors.username && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="space-y-1.5 md:space-y-2 !mt-6 md:!mt-10">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors text-sm md:text-base"
          />
          {errors.password && (
            <p className="text-red-500 text-xs md:text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {tab === "register" && (
          <div className="space-y-1.5 md:space-y-2">
            <input
              type="password"
              placeholder="Repeat password"
              {...register("confirm_password", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-2.5 md:py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors text-sm md:text-base"
            />
            {"confirm_password" in errors && errors.confirm_password && (
              <p className="text-red-500 text-xs md:text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center items-center w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-600 py-2.5 md:py-3 rounded-lg text-black font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed !mt-8 md:!mt-[3rem] text-sm md:text-base min-h-[44px]"
        >
          {isSubmitting ? (
            <Spinner size="2" />
          ) : tab === "login" ? (
            "Login"
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </div>
  );
}
