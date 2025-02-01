import { Link } from "react-router-dom";
import logo from "../assets/Google_Keep_icon_(2020).svg.png";
import searchIcon from "../assets/search_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import menu from "../assets/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import refresh from "../assets/refresh_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import grid from "../assets/grid_view_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import options from "../assets/settings_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import apps from "../assets/apps_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import DropDownOptionsIcon from "./icon-components/OptionsIcon";
export default function NavBar({ toggleSidebar }) {
  return (
    <>
      {/* burger and logo */}

      <nav className="top-0 w-full z-50 flex items-center  text-white p-4 h-16 border-b border-gray-200">
        <div className="flex items-center gap-6 justify-start w-40 ">
          <span className="text-2xl text-black">
            <div className="rounded-full p-3 hover:bg-[#EBECEC]">
              <img src={menu} alt="burger" className="cursor-pointer" onClick={(e) => {
    e.stopPropagation();
    toggleSidebar();
  }}  />
            </div>
          </span>
          <Link to="/">
            <img src={logo} alt="logo" className="w-auto h-9 flex items-center justify-center" />
          </Link>
        </div>
        {/* searchbar */}
        <div className="flex items-center flex-grow h-7 max-w-[747px] z-auto bg-secondary-light dark:bg-search-dark border-round py-6 rounded-lg ">
          <span className="h-5 w-px bg-secondary-light dark:bg-search-dark mx-2"></span>

          <div className="rounded-full p-2 hover:bg-[#EBECEC]">
            <img src={searchIcon} alt="search magnifier" />
          </div>
          <span className="h-5 w-px bg-[#F1F3F4] dark:bg-search-dark mx-2"></span>
          <input type="text" placeholder="Search" className="bg-[#F1F3F4] dark:bg-search-dark border-0 focus:outline-none" />
          <span className="h-5 w-14 bg-[#F1F3F4] dark:bg-search-dark mx-2"></span>
        </div>
        <span className="flex-grow"></span>
        {/* icons */}
        <div className="flex items-center gap-0 ">
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={refresh} alt="refresh" />
          </div>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={grid} alt="grid" />
          </div>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <DropDownOptionsIcon iconSrc={options} />
          </div>
          <div className="flex gap-1 ml-4">
            <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
              <img src={apps} alt="apps" />
            </div>
            {/* profile circle */}
            <div className="flex items-center justify-center">
              <div className="w-7 h-7 rounded-full border-2 border-[orange]"></div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
