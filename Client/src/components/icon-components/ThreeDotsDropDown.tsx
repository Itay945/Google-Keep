import { useState, useEffect, useRef } from "react";

export default function DropDownThreeDots({ iconSrc }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      <div onClick={toggleDropdown}>
        <img className="cursor-pointer" src={iconSrc} alt="options" />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg text-black">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete note</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change labels</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add drawing</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Make a copy</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Show tick boxes</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Copy to Google Docs</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Version history</li>
          </ul>
        </div>
      )}
    </div>
  );
}
