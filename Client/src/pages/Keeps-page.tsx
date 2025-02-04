import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import KeepsForm from '../components/KeepsForm';
import KeepsMain, { Keep } from '../components/KeepsMain';
import api from '../helpers/axiosApiToken';
import { useAuth } from '../hooks/useAuth';

export default function KeepsPage() {
  const { loggedInUser } = useAuth();
  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const fetchKeeps = async () => {
    try {
      if (!loggedInUser) return;

      setIsLoading(true);
      const response = await api.get(`/keeps/user/${loggedInUser.userId}`);

      if (response.data?.data?.keeps) {
        setKeeps(response.data.data.keeps);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching keeps:', err);
      setError('Failed to fetch keeps.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeeps();
  }, [loggedInUser]);

  const handleKeepUpdate = async (keepId: string, updates: Partial<Keep>) => {
    try {
      const response = await api.put(`/keeps/${keepId}`, updates);

      if (response.status === 200 && response.data?.data?.keep) {
        setKeeps((prevKeeps) => prevKeeps.map((keep) => (keep._id === keepId ? { ...keep, ...response.data.data.keep } : keep)));
        setError(null);
      }
    } catch (error) {
      console.error('Failed to update keep:', error);
      setError('Failed to update keep.');
    }
  };

  const handleKeepAdded = (newKeep: Keep) => {
    setKeeps((prevKeeps) => [newKeep, ...prevKeeps]);
  };

  if (!loggedInUser) {
    return null; // or a loading spinner, or redirect to login
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <Outlet context={{ handleKeepUpdate, fetchKeeps }} />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <KeepsForm onKeepsAdded={handleKeepAdded} />

          <KeepsMain keeps={keeps} onKeepUpdate={handleKeepUpdate} error={error} />
        </>
      )}
    </div>
  );
}
