import { useState } from "react";
import img_google from "../shared/assets/search.png";
import type { TabType } from "@/widgets/AuthForm/model/auth";
import AuthForm from "@/widgets/AuthForm/ui/AuthForm";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/widgets/AuthForm/model/useAuthMutaion";

export const AuthPage = () => {
  const [tab, setTab] = useState<TabType>("login");
  const { submitGoogleAuth, isLoading } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user info from Google");
        }

        const userInfo = await userInfoResponse.json();
        console.log("User info:", userInfo);

        await submitGoogleAuth({
          email: userInfo.email,
          username: userInfo.name,
          googleId: userInfo.sub,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error("Google auth failed:", error);
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <div className="h-[60vh] md:h-[80vh] w-full flex items-center justify-center p-4 py-8 md:py-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1a1a1a] shadow-2xl rounded-xl flex flex-col gap-4 md:gap-6 overflow-hidden border border-gray-800">
          <h3 className="text-center mt-6 md:mt-10 text-2xl md:text-3xl font-bold text-amber-500 tracking-tight">
            InstaMat
          </h3>

          <div className="px-4 md:px-8 py-4 md:py-6">
            <div className="flex w-full mb-6 md:mb-8 rounded-lg overflow-hidden">
              <button
                className={`flex-1 py-2.5 md:py-3 font-medium transition-all text-sm md:text-base ${
                  tab === "login"
                    ? "bg-amber-500 text-black"
                    : "bg-[#2a2a2a] text-gray-400 hover:text-gray-300 hover:bg-[#333333] active:bg-[#333333]"
                }`}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2.5 md:py-3 font-medium transition-all text-sm md:text-base ${
                  tab === "register"
                    ? "bg-amber-500 text-black"
                    : "bg-[#2a2a2a] text-gray-400 hover:text-gray-300 hover:bg-[#333333] active:bg-[#333333]"
                }`}
                onClick={() => setTab("register")}
              >
                Register
              </button>
            </div>

            <AuthForm tab={tab} />

            <div className="flex justify-center mt-4 md:mt-3">
              <button
                onClick={() => googleLogin()}
                disabled={isLoading}
                className="flex w-full justify-center items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-[#2a2a2a] text-gray-300 rounded-lg hover:bg-[#333333] active:bg-[#333333] transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                <img src={img_google} className="w-4 md:w-5" alt="Google" />
                <span className="text-xs md:text-sm font-medium">
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
