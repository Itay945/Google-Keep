// SingleKeep.tsx
import deleteForever from "../assets/delete_forever_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import restore from "../assets/restore_from_trash_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

const colorMap = {
  Coral: "#FAAFA8",
  Peach: "#F39F76",
  Sand: "#FFF8B8",
  Mint: "#E2F6D3",
  Sage: "#B4DDD3",
  Fog: "#D4E4ED",
  Storm: "#AECCDC",
  Dusk: "#D3BFDB",
  Blossom: "#F6E2DD",
  Clay: "#E9E3D4",
  Chalk: "#EFEFF1",
};

type KeepProps = {
  keep: {
    id: string; // Unique ID for the keep to update in the database
    pin: boolean;
    title: string;
    description: string;
    color: keyof typeof colorMap; // Type narrowed to valid color keys
    labels: string[];
    author: string;
    date: Date;
  };
};

export default function SingleKeep({ keep }: KeepProps) {
  return (
    <div className="border border-gray-100 rounded-lg p-4 group" style={{ backgroundColor: colorMap[keep.color] || "#ffffff" }}>
      <div className="flex justify-between">
        <h3 className={`text-lg font-bold ${keep.pin ? "text-yellow-500" : ""}`}>{keep.title}</h3>
      </div>
      <p className="text-sm">{keep.description}</p>
      <p className="text-xs">
        <strong>Labels:</strong> {keep.labels.join(", ")}
      </p>
      <p className="text-xs">
        <small>{new Date(keep.date).toLocaleDateString()}</small>
      </p>
      <div className="flex gap-4 group"></div>
      <img
        src={deleteForever}
        alt="delete forever"
        className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
      />
      <img
        src={restore}
        alt="restore"
        className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
      />
    </div>
  );
}
