import plusBell from "./../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import collaborator from "./../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import colors from "./../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import brush from "./../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import archive from "./../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import threeDots from "./../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import pin from "./../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
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
    <div className={`bg-${keep.color.toLowerCase()} border border-gray-100 rounded-lg p-4 group`}>
      <div className="flex justify-between">
        <h3 className={`text-lg font-bold ${keep.pin ? "text-yellow-500" : "text-black"}`}>{keep.title}</h3>
        <img src={pin} alt="pin" className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
      </div>
      <p className="text-sm text-gray-700">{keep.description}</p>
      <p className="text-xs text-gray-600">
        <strong>Labels:</strong> {keep.labels.join(", ")}
      </p>
      <p className="text-xs text-gray-500">
        <small>{new Date(keep.date).toLocaleDateString()}</small>
      </p>
      <div className="flex gap-4 group">
        <img src={plusBell} alt="Remind Me" className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
        <img
          src={collaborator}
          alt="collaborator"
          className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
        />
        <img src={colors} alt="color palette" className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
        <img src={brush} alt="brush" className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
        <img src={archive} alt="archive" className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
        <img src={threeDots} alt="more" className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
      </div>
    </div>
  );
}
