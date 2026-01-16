import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { TabType } from "@/widgets/AuthForm/model/auth";
import AuthForm from "@/widgets/AuthForm/ui/AuthForm";
import { useNavigate } from "@tanstack/react-router";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/widgets/AuthForm/model/useAuthMutaion";

export const AuthPage = () => {
  const [tab, setTab] = useState<TabType>("login");
  const navigate = useNavigate();
  const { submitGoogleAuth, isLoading } = useAuth();

  return (
    <div className="h-[80vh] w-full relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-72 h-72 bg-blue-400 rounded-full blur-3xl mix-blend-soft-light" />
        <div className="absolute bottom-16 right-16 w-96 h-96 bg-cyan-400 rounded-full blur-3xl mix-blend-soft-light" />
      </div>
      <button
        onClick={() => navigate({ to: -1 })}
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent text-gray-800 hover:bg-gray-100 absolute top-4 left-4 z-20 p-2 rounded-full hover:bg-blue-100 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-blue-500" />
      </button>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl border border-blue-100 rounded-2xl flex flex-col gap-6 overflow-hidden">
          <h3 className="text-center mt-10 text-3xl font-semibold text-blue-600 tracking-tight">
            InstaMat
          </h3>
          <div className="px-8 py-6 [&:last-child]:pb-8">
            <div className="grid w-full grid-cols-2 mb-6 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <button
                className={`py-3 text-sm font-medium transition-all rounded-l-lg ${
                  tab === "login"
                    ? "bg-blue-600 text-white shadow-inner"
                    : "bg-transparent text-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                className={`py-3 text-sm font-medium transition-all rounded-r-lg ${
                  tab === "register"
                    ? "bg-blue-600 text-white shadow-inner"
                    : "bg-transparent text-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setTab("register")}
              >
                Register
              </button>
            </div>

            <div className="mb-6">
              <GoogleLogin
                onSuccess={async (res) => {
                  if (res.credential) {
                    try {
                      await submitGoogleAuth(res.credential);
                    } catch (error) {
                      console.error("Google auth failed:", error);
                    }
                  }
                }}
                onError={() => {
                  console.error("Google Login Failed");
                }}
                useOneTap
                disabled={isLoading}
              />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">or</span>
                </div>
              </div>
            </div>

            <AuthForm tab={tab} />
          </div>
        </div>
      </div>
    </div>
  );
};
