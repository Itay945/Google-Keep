import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Google_Keep_icon_(2020).svg.png";
import searchIcon from "../assets/icons8-search-50.png";
import xIcon from "../assets/xicon.png";
export default function NavBar() {
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
    {/* navbar */}
      <nav className="sticky top-0 z-50 flex items-center bg-white text-white p-4 h-16 border-b border-gray-200 ">
        {/* left side icon and burger */}
        <div className="flex items-center gap-6 justify-start w-40">
          <span className="cursor-pointer text-2xl text-black" onClick={toggleSidebar}>☰</span>
            <Link to="/">
              <img src={logo} alt="logo" className="w-auto h-9 flex items-center justify-center" />
            </Link>
        </div>
        
            {/* searchBar */}
        <div className="flex items-center flex grow  h-7 w-96 bg-greySearchBarColor z-auto text-black border-round  py-6 rounded-lg  ">
        <span className="h-5 w-px bg-gray-300 mx-2"></span> 
            <img src={searchIcon} alt="search magnifier" className="h-7 w-7 bg-opacity-40 mr-2"/>   
            <span className="h-5 w-px bg-gray-300 mx-2"></span>     
        <input type="text" placeholder="Search" className="bg-greySearchBarColor border-0  focus:outline-none" />
        <span className="h-5 w-14 bg-gray-300 mx-2"></span> 
        {/* <img src={xIcon} alt="x-icon" className="h-5 w-5 bg-opacity-40" /> */}
        </div>
        
      </nav>
        {/* side bar */}
      <div
        ref={sidebarRef}
        className={`flex flex-col flex-grow h-full bg-white text-black flex flex-col p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-150`}>
          {/* side bar links */}
        <Link to="/" className="mb-2 hover:text-orange-400" >
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

