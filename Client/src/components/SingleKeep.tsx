import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import plusBell from './../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import collaborator from './../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import colors from './../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import brush from './../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import archive from './../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import threeDots from './../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import pin from './../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import pinFull from '../assets/keep_24dp_9AA0A6_FILL1_wght400_GRAD0_opsz24.svg';
import addImage from '../assets/image_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { handlePinToggle } from '../helpers/HandlePinToggle';
import { useState } from 'react';
import { Keep, KeepColor } from './KeepsMain';
import ColorPicker from './Single-Keep-icons/ColorPicker';
import DropDownThreeDots from './Single-Keep-icons/ThreeDotsDropDown';

const colorMap: Record<KeepColor, string> = {
  Transparent: 'transparent',
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

interface KeepProps {
  keep: Keep;
  onKeepUpdate: (keepId: string, updates: Partial<Keep>) => void;
}

export default function SingleKeep({ keep, onKeepUpdate }: KeepProps) {
  const [keepState, setKeepState] = useState({
    isPinned: keep.pin,
    currentColor: keep.color,
    isColorPickerOpen: false,
  });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: keep._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: colorMap[keepState.currentColor] || 'transparent',
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
  };

  const handlePinClick = async () => {
    await handlePinToggle(keep._id, keepState.isPinned, (newPinState: boolean) => {
      setKeepState((prev) => ({
        ...prev,
        isPinned: newPinState,
      }));
      onKeepUpdate(keep._id, { pin: newPinState });
    });
  };

  const handleColorChange = (newColor: KeepColor) => {
    setKeepState((prev) => ({
      ...prev,
      currentColor: newColor,
    }));
    onKeepUpdate(keep._id, { color: newColor });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-lg p-4 group hover:shadow-[0_0_4px_rgb(0,0,0,0.3)] ${
        !keepState.currentColor || colorMap[keepState.currentColor] === 'transparent' ? 'border border-gray-300' : ''
      } ${isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}`}
    >
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">{keep.title}</h3>
        <img
          src={keepState.isPinned ? pinFull : pin}
          alt="pin"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePinClick();
          }}
          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[6px] hover:bg-[#EBECEC]"
        />
      </div>
      <p className="text-sm break-words w-[464px]">{keep.description}</p>
      {keep.labels?.length > 0 && (
        <p className="text-xs">
          <strong>Labels:</strong> {keep.labels.join(', ')}
        </p>
      )}
      <p className="text-xs">
        <small>{new Date(keep.createdAt).toLocaleDateString()}</small>
      </p>
      <div className="flex gap-4 group">
        <div>
          <img
            src={plusBell}
            alt="Remind Me"
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] scale-[0.8]"
          />
        </div>
        <img
          src={collaborator}
          alt="collaborator"
          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
        <img
          src={colors}
          alt="color palette"
          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setKeepState((prev) => ({
              ...prev,
              isColorPickerOpen: !prev.isColorPickerOpen,
            }));
          }}
        />
        {keepState.isColorPickerOpen && (
          <ColorPicker
            keepId={keep._id}
            initialColor={keepState.currentColor}
            colors={colorMap}
            onColorChange={handleColorChange}
            onClose={() => setKeepState((prev) => ({ ...prev, isColorPickerOpen: false }))}
          />
        )}
        <img
          src={addImage}
          alt="add image"
          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC] "
        />
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

        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        >
          <DropDownThreeDots iconSrc={threeDots} _id={keep._id} onKeepUpdate={onKeepUpdate} />
        </div>
      </div>
    </div>
  );
}
