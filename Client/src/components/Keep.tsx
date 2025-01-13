import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // State to store keeps
  const [keeps, setKeeps] = useState<Keep[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch keeps when the component mounts
  useEffect(() => {
    const fetchKeeps = async () => {
      try {
        const response = await axios.get("http://localhost:3000/keeps");
        setKeeps(response.data); // Assuming the response contains an array of keeps
      } catch (err) {
        setError("Failed to fetch keeps.");
        console.error(err);
      }
    };

    fetchKeeps();
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  console.log(keeps);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {keeps.map((keep, index) => (
        <div key={index} className={`bg-${keep.color.toLowerCase()} border border-gray-100 rounded-lg p-4 w-48`}>
          <h3 className={`text-lg font-bold ${keep.pin ? "text-yellow-500" : "text-black"}`}>{keep.title}</h3>
          <p className="text-sm text-gray-700">{keep.description}</p>
          <p className="text-xs text-gray-600">
            <strong></strong> {keep.labels.join(", ")}
          </p>
          <p className="text-xs text-gray-500">
            <small>{new Date(keep.createdAt).toLocaleDateString()}</small>
          </p>
        </div>
      ))}
    </div>
  );
}
