import { usePostLogout } from "@/shared/model/useProfileUser";
import { Button } from "@radix-ui/themes";

const SettingsPage = () => {
  const { mutate: logout, isPending } = usePostLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex mr-5">
      <p className="mr-5">Do you want to log out?</p>
      <Button
        className="cursor-pointer"
        onClick={handleLogout}
        disabled={isPending}
      >
        {isPending ? "Logging out..." : "Log out"}
      </Button>
    </div>
  );
};

export { SettingsPage };
