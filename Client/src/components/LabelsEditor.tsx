import { useState, useEffect, useRef } from "react";
import close from "../assets/close_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import check from "../assets/check_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import pen from "../assets/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import add from "../assets/add_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import api from "../helpers/axiosApiToken";

import { useAuth } from "../hooks/useAuth";
export default function LabelsEditor({ isSidebarOpen }) {
  const [isLabelCreatorOpen, setIsLabelCreatorOpen] = useState(false);
  const [labels, setLabels] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newLabelName, setNewLabelName] = useState("");
  const labelEditorRef = useRef(null);
  const { loggedInUser } = useAuth();

  const handleAddLabel = async (newLabelName: string) => {
    try {
      const response = await api.post(`/users/labels`, { name: newLabelName });
      console.log("Label created:", response.data);
      setLabels((prevLabels) => [...prevLabels, response.data.label]); // Update state with new label
    } catch (err) {
      setError("Failed to create label.");
      console.error(err);
    }
  };

  useEffect(() => {
    // to do: fetch again when coming back from KeepDetails
    const fetchLabels = async () => {
      try {
        if (!loggedInUser) {
          return;
        }
        const response = await api.get(`/users/labels`);
        console.log("labels: ", response.data.data.labels);
        setLabels(response.data.data.labels);
      } catch (err) {
        setError("Failed to fetch labels.");
        console.error(err);
      }
    };

    fetchLabels();
  }, [loggedInUser]);

  useEffect(() => {
    const handleClickOutsideLabelEditor = (event) => {
      if (isLabelCreatorOpen && labelEditorRef.current && !labelEditorRef.current.contains(event.target)) {
        setIsLabelCreatorOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideLabelEditor);
    return () => document.removeEventListener("mousedown", handleClickOutsideLabelEditor);
  }, [isLabelCreatorOpen]);

  return (
    <>
      <div onClick={() => setIsLabelCreatorOpen(true)} className="mb-2 flex items-center hover:bg-[#EBECEC] rounded-full w-48">
        <img src={pen} alt="pen" className="w-6 h-6" />
        <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"}`}>Edit Labels</span>
      </div>
      {isLabelCreatorOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={labelEditorRef} className="bg-white shadow-lg w-[300px]">
            <div className="m-3">
              <h2 className="text-lg font-semibold mb-2">Edit Labels</h2>
              <div className="flex items-center">
                <img
                  src={close}
                  alt="close"
                  className="transition-all duration-300 group-hover:translate-y-0 rounded-full hover:bg-[#EBECEC] w-[20px] h-[20px]"
                />
                <input
                  type="text"
                  placeholder="Create new label"
                  className="w-full p-2 focus:border-b focus:outline-none"
                  value={newLabelName} // Bind input value to the state
                  onChange={(e) => setNewLabelName(e.target.value)}
                />
                <img
                  src={check}
                  alt="check"
                  className="transition-all duration-300 group-hover:translate-y-0 rounded-full w-[20px] h-[20px] hover:bg-[#EBECEC]"
                  onClick={() => {
                    handleAddLabel(newLabelName); // Pass the input content to the handleAddLabel function
                    setNewLabelName(""); // Clear the input after submitting
                  }}
                />
              </div>
            </div>
            <div>
              {labels.length > 0
                ? labels.map((label, index) => (
                    <div key={index} className="p-2 px-6">
                      {label.name}
                    </div>
                  ))
                : ""}
            </div>
            <div className="flex justify-end mt-4 border-t">
              <button onClick={() => setIsLabelCreatorOpen(false)} className="hover:bg-secondary-light text-[#212121] px-3 py-1 my-4 rounded-md">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
