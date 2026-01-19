import { useForm, type SubmitHandler } from "react-hook-form";
import type { AuthFormProps, LoginUser, RegisterUser } from "../model/auth";
import { useAuth } from "../model/useAuthMutaion";
import { Spinner } from "@radix-ui/themes";

export default function AuthForm({ tab }: AuthFormProps) {
  const { submitAuth } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginUser | RegisterUser>();

  const password = watch("password");

  const onSubmit: SubmitHandler<LoginUser | RegisterUser> = async (data) => {
    const { confirm_password, ...submitData } = data;
    await submitAuth(submitData, tab);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
            className="w-full px-4 py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {tab === "register" && (
          <>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Full name"
                {...register("full_name", {
                  required: tab === "register" ? "Full name required" : false,
                })}
                className="w-full px-4 py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors"
              />
              {"full_name" in errors && errors.full_name && (
                <p className="text-red-500 text-sm">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: tab === "register" ? "Nickname required" : false,
                })}
                className="w-full px-4 py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors"
              />
              {"username" in errors && errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="space-y-2 !mt-10">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full px-4 py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {tab === "register" && (
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Repeat password"
              {...register("confirm_password", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-3 bg-[#2a2a2a] text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
            {"confirm_password" in errors && errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center w-full bg-amber-500 hover:bg-amber-600 py-3 rounded-lg text-black font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed !mt-[3rem] "
        >
          {isSubmitting ? (
            <Spinner />
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
