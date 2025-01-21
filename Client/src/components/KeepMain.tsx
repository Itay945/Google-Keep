import { useState, useEffect } from 'react';
// import axios from 'axios';
import api from '../helpers/axiosApiToken';
import SingleKeep from './SingleKeep';
import { useAuth } from '../hooks/useAuth';

export type Keep = {
  _id: string;
  pin: boolean;
  title: string;
  description: string;
  color: KeepColor;
  createdAt: Date;
  labels: string[];
  author: string;
  date: Date;
};
export type KeepColor =
  | 'Coral'
  | 'Peach'
  | 'Sand'
  | 'Mint'
  | 'Sage'
  | 'Fog'
  | 'Storm'
  | 'Dusk'
  | 'Blossom'
  | 'Clay'
  | 'Chalk';

export default function Keep() {
  const { loggedInUser } = useAuth();
  console.log('loggedInUser from useHuth: ', loggedInUser);

  // console.log('loggedInUser1: ', loggedInUser._id);

  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeeps = async () => {
      try {
        // const response = await api.get(`/keeps`);
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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {keeps.map((keep, index) => (
        <SingleKeep key={index} keep={keep} />
      ))}
    </div>
  );
}
