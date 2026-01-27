import type { LucideIcon } from "lucide-react";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItem) => {
  return (
    <a
      href={href}
      className={`
        flex items-center px-4 py-3 mb-1 rounded-lg
        transition-all duration-200 no-underline
        ${
          isActive
            ? "bg-amber-100 text-amber-900 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <Icon className="mr-3" size={20} />
      <span className="font-medium">{label}</span>
    </a>
  );
};

export { SidebarItem };
