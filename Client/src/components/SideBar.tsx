import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bulb from "../assets/lightbulb_2_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import bell from "../assets/notifications_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import pen from "../assets/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import archive from "../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import close from "../assets/close_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import bin from "../assets/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import add from "../assets/add_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import check from "../assets/check_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
export default function SideBar({ isSidebarOpen, closeSidebar }) {
  const [isLabelCreatorOpen, setIsLabelCreatorOpen] = useState(false);
  const sidebarRef = useRef(null);
  const labelEditorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, closeSidebar]);

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
    <div ref={sidebarRef} className={`flex justify-between h-full p-4 transition-width duration-150 ${isSidebarOpen ? "w-64" : "w-20"}`}>
      <nav className="flex flex-col">
        <Link to="/" className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full">
          <img src={bulb} alt="lightbulb" className="w-6 h-6" />
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"} transition-opacity duration-150`}>Notes</span>
        </Link>
        <Link to="/reminders" className={` ${isSidebarOpen ? "hover:bg-[#EBECEC] rounded-full" : ""} mb-2 flex items-center`}>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={bell} alt="bell" className="w-6 h-6" />
          </div>
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"}`}>Reminders</span>
        </Link>

        {/* Labels */}
        <div onClick={() => setIsLabelCreatorOpen(true)} className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full w-48">
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
                    alt="bin"
                    className="transition-all duration-300 group-hover:translate-y-0 rounded-full  hover:bg-[#EBECEC] w-[20px] h-[20px]"
                  />

                  <input type="text" placeholder="Create new label" className="w-full p-2 focus:border-b focus:outline-none" />
                  <img
                    src={check}
                    alt="vi"
                    className="transition-all duration-300 group-hover:translate-y-0 rounded-full  w-[20px] h-[20px] hover:bg-[#EBECEC]"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 border-t ">
                <button className="hover:bg-secondary-light text-[#212121] px-3 py-1 my-4 rounded-md">Done</button>
              </div>
            </div>
          </div>
        )}

        <Link to="/forums" className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full">
          <img src={archive} alt="archive" className="w-6 h-6" />
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"}`}>Archive</span>
        </Link>
        <Link to="/bin" className="mb-2 flex items-center p-2 hover:bg-[#EBECEC] rounded-full">
          <img src={bin} alt="bin" className="w-6 h-6" />
          <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible"}`}>Bin</span>
        </Link>
      </nav>
    </div>
  );
}
