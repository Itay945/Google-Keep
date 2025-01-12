import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Keep from "./components/Keep";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <NavBar toggleSidebar={toggleSidebar} />
      <div className="flex h-screen">
        <div className="flex flex-grow">
          <SideBar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Keep />} />
              {/* Add other routes */}
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}
