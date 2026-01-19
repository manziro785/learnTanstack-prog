import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, Settings, User } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [activePath, setActivePath] = useState("/");
  const location = useLocation();
  const isCreatePostPage = location.pathname === "/create_post";

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4">
        <div className="sticky top-16">
          <div className="mb-8 px-4">
            <h2 className="text-2xl font-bold text-gray-200">InstaMat</h2>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                <Link to={item.href}>
                  <button
                    onClick={() => setActivePath(item.href)}
                    className={`
                    w-full flex items-center px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      activePath === item.href
                        ? "bg-amber-100 text-amber-900 font-semibold"
                        : "text-gray-500 hover:bg-gray-100"
                    }
                  `}
                  >
                    <item.icon className="mr-3" size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              </div>
            ))}
          </nav>

          {!isCreatePostPage && (
            <>
              <div className="mt-8 pt-8 border-t border-gray-400"></div>

              <div className="mt-4">
                <Link
                  to="/create-post"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  <span>Add New post</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

export { Sidebar };
