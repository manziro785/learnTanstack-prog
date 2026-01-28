import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, Settings, User, Plus } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [activePath, setActivePath] = useState("/feed");
  const location = useLocation();
  const isCreatePostPage = location.pathname === "/create_post";

  const menuItems = [
    { icon: Home, label: "Home", href: "/feed" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      <div className="hidden md:flex min-h-screen mr-10">
        <aside className="w-64 p-4">
          <div className="sticky top-16">
            <div className="mb-8 px-4">
              <h2 className="text-2xl font-bold text-gray-200">
                <span className="text-amber-400">I</span>nstaMat
              </h2>
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
                    to="/create_post"
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

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-200 border-t border-gray-200 z-50 safe-area-padding-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 no-underline"
            >
              <button
                onClick={() => setActivePath(item.href)}
                className={`
                  flex flex-col items-center justify-center
                  transition-all duration-200 w-full
                  ${
                    activePath === item.href
                      ? "text-amber-500"
                      : "text-gray-500"
                  }
                `}
              >
                <item.icon
                  size={24}
                  strokeWidth={activePath === item.href ? 2.5 : 2}
                />
                <span
                  className={`text-xs mt-1 ${
                    activePath === item.href ? "font-semibold" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </Link>
          ))}

          {!isCreatePostPage && (
            <Link
              to="/create_post"
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 no-underline"
            >
              <button className="flex flex-col items-center justify-center transition-all duration-200 w-full text-amber-500">
                <Plus size={24} strokeWidth={2.5} />
                <span className="text-xs mt-1 font-normal">Create</span>
              </button>
            </Link>
          )}
        </div>
      </nav>

      <div className="md:hidden h-16"></div>
    </>
  );
}

export { Sidebar };
