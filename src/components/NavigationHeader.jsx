import PropTypes from "prop-types";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
export default function NavigationBar({ triggerButton }) {
  const { setTheme } = useTheme();
  return (
    <div className="flex w-full">
      <div className="navbar bg-base-300">
        <div className="navbar-start">{triggerButton}</div>
        <div className="hidden lg:navbar-center lg:block">
          <span className="font-bold uppercase tracking-wider text-accent md:text-lg lg:text-2xl">
            STI Merch Admin
          </span>
        </div>
        <div className="navbar-end">
          <Switch
            title="Toggle theme"
            onCheckedChange={(value) => {
              if (value) {
                document.documentElement.setAttribute("data-theme", "cupcake");
              } else {
                document.documentElement.setAttribute(
                  "data-theme",
                  "customTheme",
                );
              }
              setTheme(value ? "dark" : "light");
            }}
          />
        </div>
      </div>
    </div>
  );
}
NavigationBar.propTypes = {
  triggerButton: PropTypes.object,
};
