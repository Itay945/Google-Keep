import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import bulb from "../assets/lightbulb_2_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import bell from "../assets/notifications_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import pen from "../assets/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import archive from "../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import bin from "../assets/delete_forever_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

export default function SideBar({ isSidebarOpen, closeSidebar }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`flex flex-col bg-white text-black p-4 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-150`}
    >
      <Link to="/" className="mb-2 ">
        <img src={bulb} alt="lightbulb" /> Notes
      </Link>
      <Link to="/reminders" className="mb-2 ">
        <img src={bell} alt="bell" /> Reminders
      </Link>
      <Link to="/categories" className="mb-2 ">
        <img src={pen} alt="pen" /> Edit Labels
      </Link>
      <Link to="/forums" className="mb-2 ">
        <img src={archive} alt="archive" /> Archive
      </Link>
      <Link to="/bin" className="mb-2 ">
        <img src={bin} alt="bin" /> Bin
      </Link>
    </div>
  );
}
