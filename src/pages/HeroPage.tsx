import { Link } from "@tanstack/react-router";
import {
  Camera,
  Heart,
  Hash,
  Users,
  Bookmark,
  Search,
  TrendingUp,
} from "lucide-react";
import "@/app/styles/heroPage.css";

export function HeroPage() {
  const features = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Share Your Moments",
      description:
        "Upload stunning photos and share your life's best moments with the world",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Connect & Engage",
      description:
        "Like, comment, and interact with posts from people around the globe",
    },
    {
      icon: <Hash className="w-6 h-6" />,
      title: "Discover with Hashtags",
      description: "Find content you love through trending hashtags and topics",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Build Your Community",
      description: "Follow interesting people and grow your own follower base",
    },
    {
      icon: <Bookmark className="w-6 h-6" />,
      title: "Save Favorites",
      description:
        "Bookmark posts you love and access them anytime from your collection",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Powerful Search",
      description:
        "Find users, posts, and hashtags with our lightning-fast search",
    },
  ];

  return (
    <div className="text-white">
      <nav className="w-full ">
        <div className="px-6 flex justify-center items-center">
          <div className="flex items-center space-x-3">
            <span className="text-3xl !text-amber-500 !font-bold text-transparent ">
              InstaMat
            </span>
          </div>
        </div>
      </nav>

      <section className=" h-[90vh] relative pt-32 pb-20 px-6 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-semibold backdrop-blur-sm animate-fade-in">
                <TrendingUp className="w-4 h-4" />
                Join thousands of creators worldwide
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-tight animate-fade-in">
                Share Your
                <span className="px-2 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Moments
                </span>
                With the World
              </h1>

              <p className="text-xl text-gray-400">
                InstaMat is the ultimate platform for sharing photos, connecting
                with friends, and discovering amazing content through the power
                of community.
              </p>

              <div
                className="flex gap-4 animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <Link
                  to="/auth"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/40 transition-all hover:shadow-orange-500/60 hover:scale-105 flex items-center gap-2"
                >
                  Create Account
                </Link>
                <Link
                  to="/auth"
                  className="px-8 py-4 bg-[#161616] hover:bg-gray-800 backdrop-blur-sm border border-gray-700 hover:border-gray-600 rounded-xl font-bold text-lg transition-all hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black">
              Everything You Need to
              <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Connect & Create
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you share, discover, and engage
              with content that matters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-[#161616] backdrop-blur-sm border border-[#161616] hover:border-orange-500/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-orange-500/30">
                  <div className="text-orange-400">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/30">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Ready to Start Sharing?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join InstaMat today and become part of a vibrant community of
                creators and storytellers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  to="/auth"
                  className="px-10 py-4 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold text-lg shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/auth"
                  className="px-10 py-4 bg-gray-900/30 backdrop-blur-md text-white hover:bg-gray-900/50 border-2 border-white/30 hover:border-white/50 rounded-xl font-bold text-lg transition-all hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                InstaMat
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2026 InstaMat. Share your moments with the world.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
