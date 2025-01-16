import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import bulb from "../assets/lightbulb_2_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import bell from "../assets/notifications_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import pen from "../assets/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import archive from "../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import bin from "../assets/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

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
    <div ref={sidebarRef} className={`flex justify-between h-full p-4 transition-width duration-150 ${isSidebarOpen ? "w-64" : "w-20"}`}>
      {/* Sidebar Links */}
      <nav className="flex flex-col">
        <Link to="/" className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full">
          <img src={bulb} alt="lightbulb" className="w-6 h-6" />
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"}  transition-opacity duration-150`}>Notes</span>
        </Link>
        <Link to="/reminders" className={` ${isSidebarOpen ? " hover:bg-[#EBECEC] rounded-full " : ""}mb-2 flex items-center `}>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={bell} alt="bell" className="w-6 h-6" />
          </div>
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"} `}>Reminders</span>
        </Link>
        <Link to="/categories" className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full w-48">
          <img src={pen} alt="pen" className="w-6 h-6" />
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"} `}>Edit Labels</span>
        </Link>
        <Link to="/forums" className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full">
          <img src={archive} alt="archive" className="w-6 h-6" />
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"} `}>Archive</span>
        </Link>
        <Link to="/bin" className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full">
          <img src={bin} alt="bin" className="w-6 h-6" />
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"} `}>Bin</span>
        </Link>
      </nav>
    </div>
  );
}
