import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import KeepsPage from './pages/Keeps-page';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BinPage from './pages/BinPage';
import KeepDetails from './pages/KeepDetails';
import LabelPage from './pages/LabelPage';

export default function App() {
  const location = useLocation();
  const isLandingPage =
    location.pathname === '/register' || location.pathname === '/login';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {!isLandingPage && <NavBar toggleSidebar={toggleSidebar} />}
      <div className={`flex h-screen ${isLandingPage ? '' : 'flex-grow'}`}>
        {!isLandingPage && (
          <SideBar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        )}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<KeepsPage />}>
              <Route path="/keeps/:keepID" element={<KeepDetails />} />
            </Route>
            <Route path="/bin" element={<BinPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/labels/:labelName" element={<LabelPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
