// SingleKeep.tsx
import plusBell from "./../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import collaborator from "./../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import colors from "./../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import brush from "./../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import archive from "./../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import threeDots from "./../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import pin from "./../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import ColorPicker from "./Single-Keep-icons/ColorPicker";
import DropDownThreeDots from "./Single-Keep-icons/ThreeDotsDropDown";
import circularV from "../assets/check_circle_24dp_000000_FILL1_wght400_GRAD0_opsz24.svg";
import pinFull from "../assets/keep_24dp_9AA0A6_FILL1_wght400_GRAD0_opsz24.svg";
import { handlePinToggle } from "../helpers/HandlePinToggle";
import { useState } from "react";
import { Keep, KeepColor } from "./KeepsMain";

const colorMap: Record<KeepColor, string> = {
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
const darkModeColorMap: Record<KeepColor, string> = {
  Coral: "#77172E",
  Peach: "#692B17",
  Sand: "##7C4A03",
  Mint: "#264D3B",
  Sage: "#0C625D",
  Fog: "#256377",
  Storm: "#284255",
  Dusk: "#472E5B",
  Blossom: "#6C394F",
  Clay: "#4B443A",
  Chalk: "#232427",
};

type KeepProps = {
  keep: Keep;
  onPinUpdate: (keepId: string, newPinState: boolean) => void;
};

export default function SingleKeep({ keep, onPinUpdate }: KeepProps) {
  const [isPinned, setIsPinned] = useState(keep.pin);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(keep.color);

  const handlePinClick = async () => {
    await handlePinToggle(keep._id, isPinned, (newPinState: boolean) => {
      setIsPinned(newPinState);
      onPinUpdate(keep._id, newPinState);
    });
  };

  const handleColorChange = (newColor: KeepColor) => {
    setCurrentColor(newColor); // Update locally
  };
  return (
    <>
      <div className=" rounded-lg p-4 group hover:shadow-[0_0_4px_rgb(0,0,0,0.3)] " style={{ backgroundColor: colorMap[currentColor] || "#ffffff" }}>
        <div className="flex justify-between">
          <h3 className={`text-lg font-bold`}>{keep.title}</h3>
          <img
            src={isPinned ? pinFull : pin}
            alt="pin"
            onClick={handlePinClick}
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[10px] hover:bg-[#EBECEC]"
          />
        </div>
        <p className="text-sm">{keep.description}</p>
        <p className="text-xs">
          <strong>Labels:</strong> {keep.labels.join(", ")}
        </p>
        <p className="text-xs">
          <small>{new Date(keep.createdAt).toLocaleDateString()}</small>
        </p>
        <div className="flex gap-4 group">
          <img
            src={plusBell}
            alt="Remind Me"
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] scale-[0.8]"
          />
          <img
            src={collaborator}
            alt="collaborator"
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
          />
          <img
            src={colors}
            alt="color palette"
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
            onClick={() => setColorPickerOpen((prev) => !prev)}
          />
          {isColorPickerOpen && (
            <ColorPicker
              keepId={keep._id}
              initialColor={currentColor}
              colors={colorMap}
              onColorChange={handleColorChange}
              onClose={() => setColorPickerOpen(false)}
            />
          )}
          <img
            src={brush}
            alt="brush"
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
          />
          <img
            src={archive}
            alt="archive"
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
          />
          <div className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]">
            <DropDownThreeDots iconSrc={threeDots} />
          </div>
        </div>
      </div>
    </>
  );
}
