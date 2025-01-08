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
      <nav className="sticky top-0 z-50 flex justify-between items-center bg-white text-white p-4 h-16 border-b">
        <div className="flex items-center gap-6">
          <span className="cursor-pointer text-2xl text-black" onClick={toggleSidebar}>
            ☰
          </span>
          <div className="w-7 h-7 flex items-center justify-center">
            <Link to="/">
              <img src={logo} alt="logo" className="" />
            </Link>
          </div>
        </div>
        <div className="flex">        
            <input type="text" placeholder="Search" className="h-24 w-700 border-black z-auto text-black" />
        </div>
        <div>
        </div>
      </nav>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left- w-64 h-full bg-white text-black flex flex-col p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-150`}
      >
        <span
          className="text-2xl cursor-pointer mb-4 self-end"
          onClick={toggleSidebar}
        >
          &times;
        </span>
        <Link to="/home" className="mb-2 hover:text-orange-400" >
          Notes
        </Link>
        <Link to="/reminders" className="mb-2 hover:text-orange-400" >
          Reminders
        </Link>
        <Link to="/categories" className="mb-2 hover:text-orange-400" >
          Edit Labels
        </Link>
        <Link to="/forums" className="mb-2 hover:text-orange-400" >
          Archive
        </Link>
        <Link to="/bin" className="mb-2 hover:text-orange-400">
          Bin
        </Link>
      </div>
    </>
  );
}

export default NavBar;
