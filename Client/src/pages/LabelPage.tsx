// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../helpers/axiosApiToken';

// export default function LabelPage() {
//   const [keep, setKeep] = useState<Keep | null>(null);
//   const params = useParams();
//   useEffect(() => {
//     async function fetchKeep() {
//       try {
//         const res = await api.get(`/keeps/labels/${params.labelName}`);
//         console.log('res: ', res.data.data);
//         setKeep(res.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchKeep();
//   }, []);
//   return (
//     <>
//       <div>LabelPage {params.labelName} </div>
//     </>
//   );
// }
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../helpers/axiosApiToken';
import { Keep } from '../components/KeepsMain';
import KeepsForm from '../components/KeepsForm';
import KeepsMain from '../components/KeepsMain';
import { useAuth } from '../hooks/useAuth';

export default function LabelPage() {
  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { labelName } = useParams();
  const { loggedInUser } = useAuth();

  const fetchKeepsByLabel = async () => {
    try {
      if (!loggedInUser) return;

      setIsLoading(true);
      const response = await api.get(`/keeps/labels/${labelName}`);

      if (response.data?.data?.keeps) {
        setKeeps(response.data.data.keeps);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching keeps:', err);
      setError('Failed to fetch keeps with this label.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeepsByLabel();
  }, [labelName, loggedInUser]);

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
    if (newKeep.labels.includes(labelName)) {
      setKeeps((prevKeeps) => [newKeep, ...prevKeeps]);
    }
  };

  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      {/* <h1 className="text-xl font-semibold mb-4">Label: {labelName}</h1> */}

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
