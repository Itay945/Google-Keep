import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleKeep from "../components/SingleKeep";

export default function Keep() {
  type Keep = {
    pin: boolean;
    title: string;
    description: string;
    color: "Coral" | "Peach" | "Sand" | "Mint" | "Sage" | "Fog" | "Storm" | "Dusk" | "Blossom" | "Clay" | "Chalk";
    labels: string[];
    author: string;
    date: Date;
  };

  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeeps = async () => {
      try {
        const response = await axios.get("http://localhost:3000/keeps");
        setKeeps(response.data);
      } catch (err) {
        setError("Failed to fetch keeps.");
        console.error(err);
      }
    };

    fetchKeeps();
  }, []);

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
