// SingleKeep.tsx
import restore from '../assets/restore_from_trash_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import deleteForever from '../assets/delete_forever_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { useState } from 'react';
import { Keep, KeepColor } from './KeepsMain';

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
const darkModeColorMap: Record<KeepColor, string> = {
  Transparent: 'transparent',
  Coral: '#77172E',
  Peach: '#692B17',
  Sand: '##7C4A03',
  Mint: '#264D3B',
  Sage: '#0C625D',
  Fog: '#256377',
  Storm: '#284255',
  Dusk: '#472E5B',
  Blossom: '#6C394F',
  Clay: '#4B443A',
  Chalk: '#232427',
};

type KeepProps = {
  keep: Keep;
  onKeepUpdate: (keepId: string, updates: Partial<Keep>) => void;
};

export default function SingleTrash({ keep }) {
  const [keepState, setKeepState] = useState({
    isPinned: keep.pin,
    currentColor: keep.color,
    isColorPickerOpen: false,
  });

  return (
    <>
      <div
        style={{
          backgroundColor: colorMap[keepState.currentColor] || 'transparent',
        }}
        className={`rounded-lg p-4 group hover:shadow-[0_0_4px_rgb(0,0,0,0.3)] ${
          !keepState.currentColor ||
          colorMap[keepState.currentColor] === 'transparent'
            ? 'border border-gray-300'
            : ''
        }`}
      >
        <div className="flex justify-between">
          <h3 className={`text-lg font-bold`}>{keep.title}</h3>
        </div>
        <p className="text-sm">{keep.description}</p>
        <p className="text-xs">
          <strong>Labels:</strong> {keep.labels?.join(', ')}
        </p>
        <p className="text-xs">
          <small>{new Date(keep.createdAt).toLocaleDateString()}</small>
        </p>
        <div className="flex gap-4 group justify-start w-[230px]">
          {/* <div className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"></div> */}
          <img
            src={restore}
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
            alt=""
          />
          <img
            src={deleteForever}
            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
