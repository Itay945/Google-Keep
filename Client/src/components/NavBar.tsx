import { Link } from "react-router-dom";
import logo from "../assets/Google_Keep_icon_(2020).svg.png";
import searchIcon from "../assets/icons8-search-50.png";

export default function NavBar({ toggleSidebar }) {
  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center bg-white text-white p-4 h-16 border-b border-gray-200">
        <div className="flex items-center gap-6 justify-start w-40">
          <span
            className="cursor-pointer text-2xl text-black"
            onClick={toggleSidebar}
          >
            ☰
          </span>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-auto h-9 flex items-center justify-center"
            />
          </Link>
        </div>

        <div className="flex items-center flex-grow h-7 w-96 bg-greySearchBarColor z-auto text-black border-round py-6 rounded-lg">
          <span className="h-5 w-px bg-gray-300 mx-2"></span>
          <img
            src={searchIcon}
            alt="search magnifier"
            className="h-7 w-7 bg-opacity-40 mr-2"
          />
          <span className="h-5 w-px bg-gray-300 mx-2"></span>
          <input
            type="text"
            placeholder="Search"
            className="bg-greySearchBarColor border-0 focus:outline-none"
          />
          <span className="h-5 w-14 bg-gray-300 mx-2"></span>
        </div>
      </nav>
    </>
  );
}
