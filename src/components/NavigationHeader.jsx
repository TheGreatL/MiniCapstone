import { Bell } from "lucide-react";
import PropTypes from "prop-types";
export default function NavigationBar({ triggerButton }) {
  return (
    <div className="flex w-full">
      <div className="navbar bg-base-300">
        <div className="navbar-start">{triggerButton}</div>
        <div className="hidden lg:navbar-center lg:block">
          <span className="font-bold uppercase tracking-wider text-accent md:text-lg lg:text-2xl">
            STI Mech Admin
          </span>
        </div>
        <div className="navbar-end">
          <button className="btn btn-circle btn-ghost text-accent">
            <div className="indicator">
              <Bell />
              <span className="badge indicator-item badge-accent badge-xs text-center">
                1
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
NavigationBar.propTypes = {
  triggerButton: PropTypes.object,
};
