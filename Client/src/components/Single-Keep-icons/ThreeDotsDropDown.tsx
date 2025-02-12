import { useState, useEffect, useRef } from "react";
import api from "../../helpers/axiosApiToken";
import LabelSelector from "../LabelSelector";

export default function DropDownThreeDots({ iconSrc, _id, onKeepUpdate }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLabelSelectorOpen, setIsLabelSelectorOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchKeepLabels = async () => {
      try {
        const { data: keepResponse } = await api.get(`/keeps/${_id}`);
        const keepLabels = keepResponse?.data?.keep?.labels || [];

        const { data: labelsResponse } = await api.get("/labels");
        const availableLabels = labelsResponse?.data?.labels || [];

        // Map existing keep labels to their corresponding IDs
        const existingLabels = keepLabels
          .map((labelName) => {
            const matchingLabel = availableLabels.find((l) => l.name === labelName);
            return matchingLabel ? { id: matchingLabel._id, name: labelName } : null;
          })
          .filter(Boolean);

        setSelectedLabels(existingLabels);
      } catch (error) {
        console.error("Error fetching keep labels:", error);
      }
    };

    fetchKeepLabels();
  }, [_id]);

  const handleLabelSelection = async (labelId, labelName) => {
    setSelectedLabels((prevLabels) => {
      const labelExists = prevLabels.some((label) => label.id === labelId);
      return labelExists
        ? prevLabels.filter((label) => label.id !== labelId)
        : [...prevLabels, { id: labelId, name: labelName }];
    });

    try {
      const updatedLabels = selectedLabels.some((label) => label.id === labelId)
        ? selectedLabels.filter((label) => label.id !== labelId)
        : [...selectedLabels, { id: labelId, name: labelName }];

      const labelNames = updatedLabels.map((label) => label.name);

      await api.put(`/keeps/${_id}`, { labels: labelNames });

      onKeepUpdate(_id, { labels: labelNames });
    } catch (error) {
      console.error("Error updating labels:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.put(`/keeps/${_id}`, { isDeleted: true });

      if (response.status === 200) {
        onKeepUpdate(_id, { isDeleted: true });
        setDropdownOpen(false);
      }
    } catch (error) {
      console.error("Error updating note state:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setIsLabelSelectorOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <img className="cursor-pointer" src={iconSrc} alt="options" />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg text-black">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDelete}>
              Delete note
            </li>
            <li className="relative">
              <button
                onClick={() => setIsLabelSelectorOpen(true)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left"
              >
                Add labels
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add drawing</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Make a copy</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Show tick boxes</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Copy to Google Docs</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Version history</li>
          </ul>
          {isLabelSelectorOpen && (
            <div className="absolute left-full ml-2 top-0">
              <LabelSelector
                onClose={() => setIsLabelSelectorOpen(false)}
                onLabelSelect={handleLabelSelection}
                selectedLabelIds={selectedLabels.map((label) => label.id)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
