import { useState, useEffect, useRef } from "react";
import api from "../../helpers/axiosApiToken";

export default function DropDownThreeDots({ iconSrc, _id, onKeepUpdate }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.put(`/keeps/${id}`, {
        isDeleted: true,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update pin state");
      }

      console.log("Pin state updated successfully!");
      onKeepUpdate(id, { isDeleted: true });
      setDropdownOpen(false); // Close the dropdown after the request
    } catch (error) {
      console.error("Error updating note state:", error);
    }
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
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(_id)}>
              Delete note
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add labels</li>
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
