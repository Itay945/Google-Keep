import { useState, useEffect, useRef } from "react";
import useDarkMode from "./dropdown-components/DarkMode";
export default function DropDownOptionsIcon({ iconSrc }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <img src={iconSrc} alt="options" />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg text-black">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={toggleDarkMode}>
              {isDarkMode ? "Disable dark theme" : "Enable dark theme"}
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Send feedback</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">App downloads</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Keyboard shortcuts</li>
          </ul>
        </div>
      )}
    </div>
  );
}
