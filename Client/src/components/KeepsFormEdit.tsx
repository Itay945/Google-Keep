// import { useCallback, useEffect, useRef, useState } from 'react';
// import api from '../helpers/axiosApiToken';
// import { Keep, KeepColor } from './KeepsMain';
// import plusBell from './../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import collaborator from './../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import colors from './../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import threeDots from './../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import pin from './../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import pinFull from '../assets/keep_24dp_9AA0A6_FILL1_wght400_GRAD0_opsz24.svg';
// import brush from './../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import addImage from '../assets/image_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import archive from './../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import redo from '../assets/redo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import undo from '../assets/undo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import newList from '../assets/check_box_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
// import noColor from '../assets/format_color_reset_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';

// interface KeepsFormProps {
//   keep: Keep;
//   onKeepsAdded?: (newKeep: Keep) => void;
//   handleKeepUpdate: (keepId: string, updates: Partial<Keep>) => void;
//   handleClose: () => void;
// }

// const colorOptions: Record<KeepColor, string> = {
//   Transparent: 'transparent',
//   Coral: '#FAAFA8',
//   Peach: '#F39F76',
//   Sand: '#FFF8B8',
//   Mint: '#E2F6D3',
//   Sage: '#B4DDD3',
//   Fog: '#D4E4ED',
//   Storm: '#AECCDC',
//   Dusk: '#D3BFDB',
//   Blossom: '#F6E2DD',
//   Clay: '#E9E3D4',
//   Chalk: '#EFEFF1',
// };

// export default function KeepsFormEdit({
//   onKeepsAdded,
//   keep,
//   handleKeepUpdate,
//   handleClose,
// }: KeepsFormProps) {
//   const [formData, setFormData] = useState({
//     title: keep.title,
//     description: keep.description,
//   });
//   const [selectedColor, setSelectedColor] = useState<KeepColor>(keep.color);
//   const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
//   const [isPinned, setIsPinned] = useState(keep.pin);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const formRef = useRef<HTMLFormElement>(null);
//   const colorPickerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setFormData({
//       title: keep.title,
//       description: keep.description,
//     });
//     setSelectedColor(keep.color);
//     setIsPinned(keep.pin);
//   }, [keep]);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         colorPickerRef.current &&
//         !colorPickerRef.current.contains(event.target as Node)
//       ) {
//         setIsColorPickerOpen(false);
//       }
//     }

//     if (isColorPickerOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isColorPickerOpen]);

//   const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
//     ev.preventDefault();
//     const updates = {
//       title: formData.title,
//       description: formData.description,
//       color: selectedColor,
//       pin: isPinned,
//     };

//     handleKeepUpdate(keep._id, updates);
//     handleClose();
//     window.location.reload();
//   };

//   const ColorPicker = () => (
//     <div
//       ref={colorPickerRef}
//       className="absolute z-50 bg-white p-2 border rounded shadow-lg flex gap-2"
//     >
//       {Object.entries(colorOptions).map(([name, color]) => (
//         <button
//           key={name}
//           className={`w-6 h-6 rounded-full flex items-center justify-center ${
//             selectedColor === name
//               ? 'border-2 border-[#A142F4]'
//               : 'border border-transparent'
//           } hover:border-black`}
//           style={{
//             backgroundColor: color,
//           }}
//           title={name === 'Transparent' ? 'No Color' : name}
//           onClick={() => {
//             setSelectedColor(name as KeepColor);
//             setIsColorPickerOpen(false);
//           }}
//         >
//           {color === 'transparent' && (
//             <img src={noColor} alt="No Color" className="w-4 h-4" />
//           )}
//         </button>
//       ))}
//     </div>
//   );

//   return (
//     <form
//       ref={formRef}
//       onSubmit={handleSubmit}
//       className="flex flex-col border bg-transparent p-4 rounded-lg shadow-lg mb-4 w-[800px]"
//       style={{ backgroundColor: colorOptions[selectedColor] }}
//     >
//       <div className="flex justify-between">
//         <input
//           type="text"
//           placeholder="Title"
//           name="title"
//           value={formData.title}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, title: e.target.value }))
//           }
//           className="text-lg font-medium mb-2 focus:outline-none bg-transparent placeholder-[#46443F] w-full"
//         />
//         <img
//           src={isPinned ? pinFull : pin}
//           alt="pin"
//           onClick={() => setIsPinned((prev) => !prev)}
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[6px] hover:bg-[#EBECEC]"
//         />
//       </div>

//       <textarea
//         placeholder="Take a note..."
//         name="description"
//         value={formData.description}
//         onChange={(e) =>
//           setFormData((prev) => ({ ...prev, description: e.target.value }))
//         }
//         className="border-gray-300 text-sm resize-none mb-4 focus:outline-none bg-transparent placeholder-[#46443F]"
//       />

//       <div className="flex gap-1 group relative">
//         <img
//           src={plusBell}
//           alt="Remind Me"
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] scale-[0.8]"
//         />
//         <img
//           src={collaborator}
//           alt="collaborator"
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
//         />
//         <div className="relative">
//           <img
//             src={colors}
//             alt="color palette"
//             className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
//             onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
//           />
//           {isColorPickerOpen && <ColorPicker />}
//         </div>
//         <img
//           src={addImage}
//           alt="add image"
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] scale-[0.8]"
//         />
//         <img
//           src={brush}
//           alt="brush"
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
//         />
//         <img
//           src={archive}
//           alt="archive"
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
//         />
//         <img
//           src={threeDots}
//           alt="three dots options"
//           onClick={() => setIsDropdownOpen((prev) => !prev)}
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
//         />
//         {isDropdownOpen && (
//           <div className="absolute right-[300px] top-[50px] w-[133px] bg-white border rounded shadow-lg gap-2 z-50">
//             <div className="flex flex-col items-start mt-2">
//               <div className="w-full hover:bg-gray-200">
//                 <button className="text-sm ml-4 py-1 hover:bg-gray-200">
//                   Add label
//                 </button>
//               </div>
//               <div className="w-full hover:bg-gray-200">
//                 <button className="text-sm ml-4 py-1 hover:bg-gray-200">
//                   Add drawing
//                 </button>
//               </div>
//               <div className="w-full hover:bg-gray-200 mb-2">
//                 <button className="text-sm ml-4 py-1 mr-2">
//                   Show tick boxes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         <img
//           src={undo}
//           alt="undo"
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
//         />
//         <img
//           src={redo}
//           alt="redo"
//           className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
//         />
//         <div className="flex">
//           <button
//             type="submit"
//             className="transparent text-black py-2 px-4 w-[86px] rounded-md hover:bg-secondary-light"
//           >
//             close
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { Keep, KeepColor } from './KeepsMain';
import api from '../helpers/axiosApiToken';
import plusBell from './../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import collaborator from './../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import colors from './../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import threeDots from './../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import pin from './../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import pinFull from '../assets/keep_24dp_9AA0A6_FILL1_wght400_GRAD0_opsz24.svg';
import brush from './../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import addImage from '../assets/image_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import archive from './../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import redo from '../assets/redo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import undo from '../assets/undo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import noColor from '../assets/format_color_reset_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';

interface KeepsFormEditProps {
  keep: Keep;
  handleKeepUpdate: (keepId: string, updates: Partial<Keep>) => Promise<void>;
  handleClose: () => void;
}

const colorOptions: Record<KeepColor, string> = {
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

export default function KeepsFormEdit({
  keep,
  handleKeepUpdate,
  handleClose,
}: KeepsFormEditProps) {
  const [formData, setFormData] = useState({
    title: keep.title || '',
    description: keep.description || '',
    color: keep.color || ('Transparent' as KeepColor),
    pin: keep.pin || false,
  });

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData({
      title: keep.title || '',
      description: keep.description || '',
      color: keep.color || 'Transparent',
      pin: keep.pin || false,
    });
  }, [keep]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }
    }

    if (isColorPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isColorPickerOpen]);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      const response = await api.put(`/keeps/${keep._id}`, formData);

      if (response.status === 200) {
        await handleKeepUpdate(keep._id, formData);
        handleClose();
      }
    } catch (error) {
      console.error('Error updating keep:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePinToggle = () => {
    setFormData((prev) => ({
      ...prev,
      pin: !prev.pin,
    }));
  };

  const handleColorChange = (color: KeepColor) => {
    setFormData((prev) => ({
      ...prev,
      color,
    }));
    setIsColorPickerOpen(false);
  };

  const ColorPicker = () => (
    <div
      ref={colorPickerRef}
      className="absolute z-50 bg-white p-2 border rounded shadow-lg flex gap-2"
    >
      {Object.entries(colorOptions).map(([name, color]) => (
        <button
          key={name}
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            formData.color === name
              ? 'border-2 border-[#A142F4]'
              : 'border border-transparent'
          } hover:border-black`}
          style={{ backgroundColor: color }}
          title={name === 'Transparent' ? 'No Color' : name}
          onClick={() => handleColorChange(name as KeepColor)}
        >
          {color === 'transparent' && (
            <img src={noColor} alt="No Color" className="w-4 h-4" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col border bg-transparent p-4 rounded-lg shadow-lg mb-4 w-[800px]"
      style={{ backgroundColor: colorOptions[formData.color] }}
    >
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="text-lg font-medium mb-2 focus:outline-none bg-transparent placeholder-[#46443F] w-full"
        />
        <img
          src={formData.pin ? pinFull : pin}
          alt="pin"
          onClick={handlePinToggle}
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[6px] hover:bg-[#EBECEC]"
        />
      </div>

      <textarea
        placeholder="Take a note..."
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="border-gray-300 text-sm resize-none mb-4 focus:outline-none bg-transparent placeholder-[#46443F]"
      />

      <div className="flex gap-1 group relative">
        <img
          src={plusBell}
          alt="Remind Me"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] scale-[0.8]"
        />
        <img
          src={collaborator}
          alt="collaborator"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
        <div className="relative">
          <img
            src={colors}
            alt="color palette"
            className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          />
          {isColorPickerOpen && <ColorPicker />}
        </div>
        <img
          src={addImage}
          alt="add image"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] scale-[0.8]"
        />
        <img
          src={brush}
          alt="brush"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
        <img
          src={archive}
          alt="archive"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
        <img
          src={threeDots}
          alt="three dots options"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
        {isDropdownOpen && (
          <div className="absolute right-[300px] top-[50px] w-[133px] bg-white border rounded shadow-lg gap-2 z-50">
            <div className="flex flex-col items-start mt-2">
              <div className="w-full hover:bg-gray-200">
                <button className="text-sm ml-4 py-1 hover:bg-gray-200">
                  Add label
                </button>
              </div>
              <div className="w-full hover:bg-gray-200">
                <button className="text-sm ml-4 py-1 hover:bg-gray-200">
                  Add drawing
                </button>
              </div>
              <div className="w-full hover:bg-gray-200 mb-2">
                <button className="text-sm ml-4 py-1 mr-2">
                  Show tick boxes
                </button>
              </div>
            </div>
          </div>
        )}
        <img
          src={undo}
          alt="undo"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
        <img
          src={redo}
          alt="redo"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
        <div className="flex">
          <button
            type="submit"
            className="transparent text-black py-2 px-4 w-[86px] rounded-md hover:bg-secondary-light"
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
}
