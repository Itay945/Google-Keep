import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SideBar({ isSidebarOpen, closeSidebar }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
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
      className={`flex flex-col flex-grow h-full bg-white text-black p-4 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-150`}
    >
      {/* side bar links */}
      <Link to="/" className="mb-2 hover:text-orange-400">
        Notes
      </Link>
      <Link to="/reminders" className="mb-2 hover:text-orange-400">
        Reminders
      </Link>
      <Link to="/categories" className="mb-2 hover:text-orange-400">
        Edit Labels
      </Link>
      <Link to="/forums" className="mb-2 hover:text-orange-400">
        Archive
      </Link>
      <Link to="/bin" className="mb-2 hover:text-orange-400">
        Bin
      </Link>
    </div>
  );
}
