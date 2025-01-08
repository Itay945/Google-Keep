import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Google_Keep_icon_(2020).svg.png";

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-between items-center bg-gray-800 text-white p-4 h-16">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 flex items-center justify-center">
            <Link to="/">
              <img src={logo} alt="logo" className="" />
            </Link>
          </div>
        </div>
        <div>
          <span className="cursor-pointer text-2xl" onClick={toggleSidebar}>
            ☰
          </span>
        </div>
      </nav>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white flex flex-col p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <span
          className="text-2xl cursor-pointer mb-4 self-end"
          onClick={toggleSidebar}
        >
          &times;
        </span>
        <Link to="/" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          בית
        </Link>
        <Link to="/searchProfession" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          חפש מקצוע
        </Link>
        <Link to="/categories" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          קטגוריות
        </Link>
        <Link to="/forums" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          פורומים
        </Link>
        <Link to="#" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          צ'אטים
        </Link>
        <Link to="/userProfile" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          איזור אישי
        </Link>
        <Link to="/favorite" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          מועדפים
        </Link>
        <Link to="/contactUs" className="mb-2 hover:text-orange-400" onClick={closeSidebar}>
          צור קשר
        </Link>
      </div>
    </>
  );
}

export default NavBar;
