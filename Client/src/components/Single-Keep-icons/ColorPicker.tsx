import { useState, useEffect, useRef } from "react";
import api from "../../helpers/axiosApiToken";
import { KeepColor } from "../KeepsMain";
import noColor from "../../assets/format_color_reset_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";

type ColorPickerProps = {
  keepId: string;
  initialColor: string;
  colors: Record<string, string>;
  onColorChange: (color: KeepColor) => void;
  onClose: () => void;
};

export default function ColorPicker({ keepId, initialColor, colors, onColorChange, onClose }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // API call to update the color in the database
  const updateColorInDatabase = async (color: KeepColor) => {
    try {
      const response = await api.put(`/keeps/${keepId}`, { color: color });

      if (response.status !== 200) {
        throw new Error("Failed to update color");
      }
      console.log("Color updated successfully!");
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const handleColorSelect = (color: KeepColor) => {
    setSelectedColor(color);
    onColorChange(color); // Update parent state immediately
    updateColorInDatabase(color); // Trigger the API call
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={colorPickerRef} className="absolute z-50  bg-white p-2 border rounded shadow-lg flex gap-2 flex-wrap">
      {Object.entries(colors).map(([name, color]) => (
        <button
          key={name}
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            selectedColor === name ? "border-2 border-[#A142F4]" : "border border-transparent"
          } hover:border-black`}
          style={{
            backgroundColor: color === "transparent" ? "transparent" : color,
          }}
          title={name === "transparent" ? "No Color" : name}
          onClick={() => handleColorSelect(name as KeepColor)}
        >
          {color === "transparent" && (
            <img src={noColor} alt="No Color" className="w-4 h-4" />
          )}
        </button>
      ))}
    </div>
  );
  
}
