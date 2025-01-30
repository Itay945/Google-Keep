// import NoteForm from '../components/Input-Form';
// import AllKeeps from '../components/KeepMain';
import { useState, useEffect } from 'react';
import KeepsForm from '../components/KeepsForm';
import KeepsMain, { Keep } from '../components/KeepsMain';
import api from '../helpers/axiosApiToken';
import { useAuth } from '../hooks/useAuth';
import { Outlet  useLocation} from 'react-router-dom';

export default function KeepsPage() {
  const { loggedInUser } = useAuth();
  console.log("loggedInUser from useHuth: ", loggedInUser);

  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    // to do: fetch again when coming back from KeepDetails
    const fetchKeeps = async () => {
      try {
        if (!loggedInUser) {
          return;
        }
        const response = await api.get(`/keeps/user/${loggedInUser.userId}`);
        console.log("response: ", response.data.data.keeps);
        setKeeps(response.data.data.keeps);
      } catch (err) {
        setError("Failed to fetch keeps.");
        console.error(err);
      }
    };

    fetchKeeps();
  }, [loggedInUser, location.pathname]);

  const handleKeepUpdate = (keepId: string, updates: Partial<Keep>) => {
    setKeeps((prevKeeps) => prevKeeps.map((keep) => (keep._id === keepId ? { ...keep, ...updates } : keep)));
  };
  const handleKeepAdded = (newKeep: Keep) => {
    setKeeps((prevKeeps) => [newKeep, ...prevKeeps]);
    // handleKeepUpdate(newKeep._id, { ...newKeep });
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <Outlet />
      <KeepsForm onKeepsAdded={handleKeepAdded} />
      <KeepsMain keeps={keeps} onKeepUpdate={handleKeepUpdate} error={error} />
    </div>
  );
}
