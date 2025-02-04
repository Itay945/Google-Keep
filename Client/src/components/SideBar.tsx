import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bulb from '../assets/lightbulb_2_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import bell from '../assets/notifications_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import archive from '../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import bin from '../assets/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import tag from '../assets/label_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'; // You'll need to add this icon
import LabelsEditor from './LabelsEditor';
import { useAuth } from '../hooks/useAuth';
import api from '../helpers/axiosApiToken';

interface SideBarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function SideBar({ isSidebarOpen }: SideBarProps) {
  const [labels, setLabels] = useState<{ id: string; name: string }[]>([]);
  const { loggedInUser } = useAuth();

  const fetchLabels = async () => {
    try {
      if (!loggedInUser) return;
      const response = await api.get(`/users/labels`);
      setLabels(response.data.data.labels);
    } catch (err) {
      console.error('Failed to fetch labels:', err);
    }
  };

  useEffect(() => {
    fetchLabels();
  }, [loggedInUser]);

  return (
    <div className={`flex justify-between h-full p-4 transition-width duration-150 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <nav className="flex flex-col">
        <Link to="/" className={`${isSidebarOpen ? 'hover:bg-[#EBECEC] rounded-full' : ''} mb-2 flex items-center`}>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={bulb} alt="lightbulb" className="w-6 h-6" />
          </div>
          <span className={`ml-3 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>Notes</span>
        </Link>

        <Link to="/reminders" className={`${isSidebarOpen ? 'hover:bg-[#EBECEC] rounded-full' : ''} mb-2 flex items-center`}>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={bell} alt="bell" className="w-6 h-6" />
          </div>
          <span className={`ml-3 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>Reminders</span>
        </Link>

        {/* Label Links */}
        {labels.map((label) => (
          <Link
            key={label.name}
            to={`/labels/${label.name}`}
            className={`${isSidebarOpen ? 'hover:bg-[#EBECEC] rounded-full' : ''} mb-2 flex items-center`}
          >
            <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
              <img src={tag} alt="label" className="w-6 h-6" />
            </div>
            <span className={`ml-3 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>{label.name}</span>
          </Link>
        ))}

        {/* Labels Editor */}
        <LabelsEditor isSidebarOpen={isSidebarOpen} labels={labels} setLabels={setLabels} onLabelsUpdate={fetchLabels} />

        <Link to="/forums" className={`${isSidebarOpen ? 'hover:bg-[#EBECEC] rounded-full' : ''} mb-2 flex items-center`}>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={archive} alt="archive" className="w-6 h-6" />
          </div>
          <span className={`ml-3 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>Archive</span>
        </Link>

        <Link to="/bin" className={`${isSidebarOpen ? 'hover:bg-[#EBECEC] rounded-full' : ''} mb-2 flex items-center`}>
          <div className="rounded-full p-[12px] hover:bg-[#EBECEC]">
            <img src={bin} alt="bin" className="w-6 h-6" />
          </div>
          <span className={`ml-3 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>Bin</span>
        </Link>
      </nav>
    </div>
  );
}
