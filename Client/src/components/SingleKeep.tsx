type KeepProps = {
  keep: {
    pin: boolean;
    title: string;
    description: string;
    color: "Coral" | "Peach" | "Sand" | "Mint" | "Sage" | "Fog" | "Storm" | "Dusk" | "Blossom" | "Clay" | "Chalk";
    labels: string[];
    author: string;
    date: Date;
  };
};

export default function SingleKeep({ keep }: KeepProps) {
  return (
    <div className={`bg-${keep.color.toLowerCase()} border border-gray-100 rounded-lg p-4 w-48`}>
      <h3 className={`text-lg font-bold ${keep.pin ? "text-yellow-500" : "text-black"}`}>{keep.title}</h3>
      <p className="text-sm text-gray-700">{keep.description}</p>
      <p className="text-xs text-gray-600">
        <strong>Labels:</strong> {keep.labels.join(", ")}
      </p>
      <p className="text-xs text-gray-500">
        <small>{new Date(keep.date).toLocaleDateString()}</small>
      </p>
    </div>
  );
}
