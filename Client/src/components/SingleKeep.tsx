// Icons
import plusBell from './../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import collaborator from './../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import colors from './../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import brush from './../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import archive from './../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import threeDots from './../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import pin from './../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// Components
import DropDownOptionsIcon from './icon-components/OptionsIcon';
import ColorPicker from './Single-Keep-icons/ColorPicker';
// Hooks
import { useState } from 'react';

const colorMap = {
  Coral: '#FAAFA8',
  Peach: '#F39F76',
  Sand: '#FFF8B8',
  Mint: '#E2F6D3',
  Sage: '#B4DDD3',
  Fog: '#D4E4ED',
  Storm: '#AECCDC',
  Dusk: '#D3BFDB',
  Blossom: '#F6E2DD',
  Clay: '#E9E3D4',
  Chalk: '#EFEFF1',
};

type KeepProps = {
  keep: {
    id: string; // Unique ID for the keep to update in the database
    pin: boolean;
    title: string;
    description: string;
    color:
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
    labels: string[];
    author: string;
    date: Date;
  };
};

export default function SingleKeep({ keep }: KeepProps) {
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const cardColor = colorMap[keep.color] || '#ffffff';
  return (
    <div
      className={`border border-gray-100 rounded-lg p-4 group`}
      style={{ backgroundColor: cardColor }}
    >
      <div className="flex justify-between">
        <h3
          className={`text-lg font-bold ${keep.pin ? 'text-yellow-500' : ''}`}
        >
          {keep.title}
        </h3>
        <img
          src={pin}
          alt="pin"
          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[10px] hover:bg-[#EBECEC]"
        />
      </div>
      <p className="text-sm">{keep.description}</p>
      <p className="text-xs">
        <strong>Labels:</strong> {keep.labels.join(', ')}
      </p>
      <p className="text-xs">
        <small>{new Date(keep.date).toLocaleDateString()}</small>
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
        <div className="opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]">
          <DropDownOptionsIcon iconSrc={threeDots} />
        </div>
      </div>
    </div>
  );
}
