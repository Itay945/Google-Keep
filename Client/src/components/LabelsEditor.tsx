import { useState, useEffect, useRef } from "react";
import close from "../assets/close_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import check from "../assets/check_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import pen from "../assets/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import add from "../assets/add_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import api from "../helpers/axiosApiToken";
import remove from "../assets/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

type Label = {
  id: string;
  name: string;
  createdAt: Date;
};


import { useAuth } from "../hooks/useAuth";
export default function LabelsEditor({ isSidebarOpen, labels, setLabels, onLabelsUpdate }) {
  const [isLabelCreatorOpen, setIsLabelCreatorOpen] = useState(false);
  const [error, setError] = useState(null);
  const [newLabelName, setNewLabelName] = useState("");
  const labelEditorRef = useRef(null);

  const handleDeleteLabel = async (id) => {
    try {
      await api.delete(`/users/labels/${id}`);
      setLabels((prevLabels) => prevLabels.filter(label => label.id !== id));
      onLabelsUpdate();
    } catch (err) {
      setError("Failed to delete label.");
      console.error(err);
    }
  };

  const handleAddLabel = async (newLabelName) => {
    try {
      const response = await api.post(`/users/labels`, { name: newLabelName });
      const newLabel = response.data?.data?.label;
      setLabels((prevLabels) => [...prevLabels, newLabel]);
      onLabelsUpdate();
    } catch (err) {
      setError("Failed to create label.");
      console.error(err);
    }
  };

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
                  className=" group-hover:translate-y-0 rounded-full hover:bg-[#EBECEC] w-[20px] h-[20px]"
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
                  className=" group-hover:translate-y-0 rounded-full w-[20px] h-[20px] hover:bg-[#EBECEC]"
                  onClick={() => {
                    if (!newLabelName.trim()) {
                      return;
                    }
                    handleAddLabel(newLabelName);
                    setNewLabelName(""); 
                  }}
                />
              </div>
            </div>
            <div>
              {labels.length > 0
                ? labels.map((label, index) => (
                  
                    <div key={index} className="flex p-2 px-6 justify-between">
                      <img src={remove} alt="bin" onClick={() => handleDeleteLabel(label.id)} className=" group-hover:translate-y-0 rounded-full w-[20px] h-[20px] hover:bg-[#EBECEC]"/>
                      <div className="ml-[30px]">
                      {label.name}
                      </div>
                      <span className="flex flex-grow"></span>
                      <img src={pen} alt="pen" className=" group-hover:translate-y-0 rounded-full w-[20px] h-[20px] hover:bg-[#EBECEC]" />
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
