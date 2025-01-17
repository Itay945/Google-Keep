import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import KeepsPage from './pages/Keeps-page';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/Authcontext';
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
      <AuthProvider>
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="flex h-screen">
          <div className="flex flex-grow">
            <SideBar
              isSidebarOpen={isSidebarOpen}
              closeSidebar={closeSidebar}
            />
            <main className="flex-grow p-4">
              <Routes>
                <Route path="/" element={<KeepsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
