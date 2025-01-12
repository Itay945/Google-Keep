import { Link } from "react-router-dom";
import logo from "../assets/Google_Keep_icon_(2020).svg.png";
import searchIcon from "../assets/search_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import menu from "../assets/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import refresh from "../assets/refresh_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import grid from "../assets/grid_view_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import options from "../assets/settings_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import apps from "../assets/apps_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
export default function NavBar({ toggleSidebar }) {
  return (
    <>
      {/* burger and logo */}
      <nav className="sticky top-0 z-50 flex items-center bg-white text-white p-4 h-16 border-b border-gray-200">
        <div className="flex items-center gap-6 justify-start w-40">
          <span className="cursor-pointer text-2xl text-black" onClick={toggleSidebar}>
            <img src={menu} alt="burger" className=" text-black" />
          </span>
          <Link to="/">
            <img src={logo} alt="logo" className="w-auto h-9 flex items-center justify-center" />
          </Link>
        </div>
        {/* searchbar */}
        <div className="flex items-center flex-grow h-7 w-96 bg-greySearchBarColor z-auto text-black border-round py-6 rounded-lg">
          <span className="h-5 w-px bg-gray-300 mx-2"></span>
          <img src={searchIcon} alt="search magnifier" className="h-7 w-7 bg-opacity-40 mr-2" />
          <span className="h-5 w-px bg-gray-300 mx-2"></span>
          <input type="text" placeholder="Search" className="bg-greySearchBarColor border-0 focus:outline-none" />
          <span className="h-5 w-14 bg-gray-300 mx-2"></span>
        </div>
        <div className="flex items-center gap-5">
          <img src={refresh} alt="refresh" className="pl-2" />
          <img src={grid} alt="grid" />
          <img src={options} alt="options" />
          <img src={apps} alt="apps" />
          {/* profile circle */}
          <div className="flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-gray-100"></div>
          </div>
        </div>
      </nav>
    </>
  );
}
