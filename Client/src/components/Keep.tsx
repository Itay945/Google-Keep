export default function Keep() {
  type Keep = {
    pin: boolean;
    title: string;
    description: string;
    color:
      | "Coral"
      | "Peach"
      | "Sand"
      | "Mint"
      | "Sage"
      | "Fog"
      | "Storm"
      | "Dusk"
      | "Blossom"
      | "Clay"
      | "Chalk";
    labels: string[];
    author: string; // Simplified for now
    date: Date;
  };

  const dummyKeeps: Keep[] = [
    {
      pin: true,
      title: "Grocery List",
      description: "Buy milk, eggs, and bread.",
      color: "Mint",
      labels: ["Shopping", "Essentials"],
      author: "60d21b4667d0d8992e610c85",
      date: new Date("2025-01-09T10:00:00Z"),
    },
    {
      pin: false,
      title: "Workout Plan",
      description: "Run 5km, do pushups, and stretch.",
      color: "Coral",
      labels: ["Health", "Exercise"],
      author: "60d21b4667d0d8992e610c85",
      date: new Date("2025-01-08T08:00:00Z"),
    },
    {
      pin: true,
      title: "Project Notes",
      description: "Finish API integration by next week.",
      color: "Sage",
      labels: ["Work", "Development"],
      author: "60d21b4667d0d8992e610c85",
      date: new Date("2025-01-07T15:30:00Z"),
    },
    {
      pin: false,
      title: "Birthday Ideas",
      description: "Plan a surprise party for Alex.",
      color: "Blossom",
      labels: ["Personal", "Events"],
      author: "60d21b4667d0d8992e610c85",
      date: new Date("2025-01-06T12:00:00Z"),
    },
    {
      pin: false,
      title: "Book Recommendations",
      description: "Read 'Atomic Habits' and 'Deep Work'.",
      color: "Storm",
      labels: ["Reading", "Self-Improvement"],
      author: "60d21b4667d0d8992e610c85",
      date: new Date("2025-01-05T09:45:00Z"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {dummyKeeps.map((keep, index) => (
        <div
          key={index}
          className={`bg-${keep.color.toLowerCase()} border border-gray-300 rounded-lg p-4 w-48`}
        >
          <h3
            className={`text-lg font-bold ${
              keep.pin ? "text-yellow-500" : "text-black"
            }`}
          >
            {keep.title}
          </h3>
          <p className="text-sm text-gray-700">{keep.description}</p>
          <p className="text-xs text-gray-600">
            <strong>Labels:</strong> {keep.labels.join(", ")}
          </p>
          <p className="text-xs text-gray-500">
            <small>{new Date(keep.date).toLocaleDateString()}</small>
          </p>
        </div>
      ))}
    </div>
  );
}
