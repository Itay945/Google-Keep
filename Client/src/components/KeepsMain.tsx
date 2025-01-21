import { useState, useEffect } from "react";
// import axios from 'axios';
import api from "../helpers/axiosApiToken";
import SingleKeep from "./SingleKeep";
import { useAuth } from "../hooks/useAuth";

export type Keep = {
  _id: string;
  title: string;
  description: string;
  color: KeepColor;
  labels: string[];
  isDeleted: false;
  editedAt: date;
  createdAt: Date;
  author: string;
  pin: boolean;
};
export type KeepColor = "Coral" | "Peach" | "Sand" | "Mint" | "Sage" | "Fog" | "Storm" | "Dusk" | "Blossom" | "Clay" | "Chalk";

export default function KeepsMain() {
  const { loggedInUser } = useAuth();
  console.log("loggedInUser from useHuth: ", loggedInUser);

  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleKeepPinUpdate = (keepId: string, newPinState: boolean) => {
    setKeeps((prevKeeps) => prevKeeps.map((keep) => (keep._id === keepId ? { ...keep, pin: newPinState } : keep)));
  };

  useEffect(() => {
    const fetchKeeps = async () => {
      try {
        if (!loggedInUser) {
          return;
        }
        const response = await api.get(`/users/${loggedInUser.userId}`);
        console.log("response: ", response.data);

        setKeeps(response.data);
      } catch (err) {
        setError("Failed to fetch keeps.");
        console.error(err);
      }
    };

    fetchKeeps();
  }, [loggedInUser]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const pinnedKeeps = keeps.filter((keep) => keep.pin);
  const otherKeeps = keeps.filter((keep) => !keep.pin);

  return (
    <>
      <div className="flex gap-4 p-4">
        {pinnedKeeps.length > 0 && (
          <div className="">
            <h2>Pinned</h2>
            {pinnedKeeps.map((keep) => (
              <SingleKeep key={keep._id} keep={keep} onPinUpdate={handleKeepPinUpdate} />
            ))}
          </div>
        )}
        {otherKeeps.length > 0 && (
          <div>
            {pinnedKeeps.length > 0 && <h2>Others</h2>}
            {otherKeeps.map((keep) => (
              <SingleKeep key={keep._id} keep={keep} onPinUpdate={handleKeepPinUpdate} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
