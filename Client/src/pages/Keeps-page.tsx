// import NoteForm from '../components/Input-Form';
// import AllKeeps from '../components/KeepMain';
import { useState, useEffect } from 'react';
import KeepsForm from '../components/KeepsForm';
import KeepsMain, { Keep } from '../components/KeepsMain';
import api from '../helpers/axiosApiToken';
import { useAuth } from '../hooks/useAuth';
export default function KeepsPage() {
  const { loggedInUser } = useAuth();
  console.log('loggedInUser from useHuth: ', loggedInUser);

  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeeps = async () => {
      try {
        if (!loggedInUser) {
          return;
        }
        const response = await api.get(`/users/${loggedInUser.userId}`);
        console.log('response: ', response.data);

        setKeeps(response.data);
      } catch (err) {
        setError('Failed to fetch keeps.');
        console.error(err);
      }
    };

    fetchKeeps();
  }, [loggedInUser]);

  const handleKeepUpdate = (keepId: string, updates: Partial<Keep>) => {
    debugger;
    setKeeps((prevKeeps) =>
      prevKeeps.map((keep) =>
        keep._id === keepId ? { ...keep, ...updates } : keep
      )
    );
  };
  const handleKeepAdded = (newKeep: Keep) => {
    setKeeps((prevKeeps) => [newKeep, ...prevKeeps]);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      {/* <NoteForm /> */}
      <KeepsForm onKeepsAdded={handleKeepAdded} />
      <KeepsMain keeps={keeps} onKeepUpdate={handleKeepUpdate} error={error} />
    </div>
  );
}
