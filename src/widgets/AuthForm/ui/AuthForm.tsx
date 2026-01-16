import { useForm, type SubmitHandler } from "react-hook-form";
import type { AuthFormProps, LoginUser, RegisterUser } from "../model/auth";
import { useAuth } from "../model/useAuthMutaion";
import { Spinner } from "@radix-ui/themes";

export default function AuthForm({ tab }: AuthFormProps) {
  const { submitAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUser | RegisterUser>();

  const onSubmit: SubmitHandler<LoginUser | RegisterUser> = async (data) => {
    await submitAuth(data, tab);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label
            className="flex items-center gap-2 text-sm font-medium  text-gray-700 select-none"
            htmlFor="login-email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
            className="w-full px-3 py-2 border-2 border-sky-200 placeholder-gray-400 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        {tab === "register" && (
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-medium  text-gray-700 select-none"
              htmlFor="login-nickname"
            >
              Nickname
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: tab === "register" ? "Nickname required" : false,
              })}
              className="w-full px-3 py-2 border-2 border-sky-200 placeholder-gray-400 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {"username" in errors && errors.username && (
              <p className="text-red-600 text-sm">{errors.username.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label
            className="flex items-center  gap-2 text-sm font-medium text-gray-700 select-none"
            htmlFor="login-password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full px-3 py-2 border-2 border-sky-200 placeholder-gray-400 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg text-white font-semibold"
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
