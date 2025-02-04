import { useEffect, useRef, useState } from "react";
import search from "../assets/search_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import api from "../helpers/axiosApiToken";
import { useAuth } from "../hooks/useAuth";

interface LabelSelectorProps {
  onClose: () => void;
  onLabelSelect?: (labelId: string, labelName: string) => void;
  selectedLabelIds?: string[];
}

export default function LabelSelector({ onClose, onLabelSelect, selectedLabelIds = [] }: LabelSelectorProps) {
  const [labels, setLabels] = useState<{ id: string; name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const selectorRef = useRef<HTMLDivElement>(null);

  const { loggedInUser } = useAuth();

  const fetchLabels = async () => {
    try {
      if (!loggedInUser) return;
      const response = await api.get(`/users/labels`);
      setLabels(response.data.data.labels);
    } catch (err) {
      console.error("Failed to fetch labels:", err);
    }
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCheckboxChange = (labelId: string, labelName: string) => {
    if (onLabelSelect) {
      onLabelSelect(labelId, labelName);
    }
  };

  const filteredLabels = labels.filter((label) => label.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div ref={selectorRef} className="absolute right-[300px] top-[50px] w-[300px] bg-white border shadow-lg z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-medium">Label note</h3>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter label name"
            className="w-full mb-3 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={search} alt="magnifier" className="w-5 h-5" />
        </div>
        <div>
          {filteredLabels.length > 0
            ? filteredLabels.map((label) => (
                <div key={label.id} className="flex p-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedLabelIds.includes(label.id)}
                    onChange={() => handleCheckboxChange(label.id, label.name)}
                    className="mr-2"
                  />
                  <span>{label.name}</span>
                </div>
              ))
            : searchQuery
            ? "No matching labels found"
            : "No labels found"}
        </div>
      </div>
    </div>
  );
}
