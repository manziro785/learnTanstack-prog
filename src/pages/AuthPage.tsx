import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import img_google from "../shared/assets/search.png";
import type { TabType } from "@/widgets/AuthForm/model/auth";
import AuthForm from "@/widgets/AuthForm/ui/AuthForm";
import { useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/widgets/AuthForm/model/useAuthMutaion";

export const AuthPage = () => {
  const [tab, setTab] = useState<TabType>("login");
  const navigate = useNavigate();
  const { submitGoogleAuth, isLoading } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await submitGoogleAuth(tokenResponse.access_token);
      } catch (error) {
        console.error("Google auth failed:", error);
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <div className="h-[80vh] w-full flex items-center justify-center p-4">
      <button
        onClick={() => navigate({ to: -1 })}
        className="absolute top-6 left-6 text-amber-500 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1a1a1a] shadow-2xl rounded-xl flex flex-col gap-6 overflow-hidden border border-gray-800">
          <h3 className="text-center mt-10 text-3xl font-bold text-amber-500 tracking-tight">
            InstaMat
          </h3>

          <div className="px-8 py-6">
            <div className="flex w-full mb-8 rounded-lg overflow-hidden">
              <button
                className={`flex-1 py-3 font-medium transition-all ${
                  tab === "login"
                    ? "bg-amber-500 text-black"
                    : "bg-[#2a2a2a] text-gray-400 hover:text-gray-300 hover:bg-[#333333]"
                }`}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 font-medium transition-all ${
                  tab === "register"
                    ? "bg-amber-500 text-black"
                    : "bg-[#2a2a2a] text-gray-400 hover:text-gray-300 hover:bg-[#333333]"
                }`}
                onClick={() => setTab("register")}
              >
                Register
              </button>
            </div>

            <AuthForm tab={tab} />

            <div className="flex justify-center mt-3">
              <button
                onClick={() => googleLogin()}
                disabled={isLoading}
                className="flex w-full justify-center items-center gap-3 px-6 py-3 bg-[#2a2a2a] text-gray-300 rounded-lg hover:bg-[#333333] transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={img_google} className="w-5" alt="Google" />
                <span className="text-sm font-medium">
                  {isLoading ? "Loading..." : "Sign in with Google"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
