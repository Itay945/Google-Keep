import { useEffect, useRef, useState } from 'react';
import api from '../helpers/axiosApiToken';
import { Keep } from './KeepsMain';
import plusBell from './../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import collaborator from './../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import colors from './../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import threeDots from './../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import pin from './../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import brush from './../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import addImage from "../assets/image_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import archive from './../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import redo from "../assets/redo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import undo from "../assets/undo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import newList from "../assets/check_box_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import noColor from "../assets/format_color_reset_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";

interface KeepsFormProps {
  onKeepsAdded: (newKeep: Keep) => void;
}

// Color options
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

export default function KeepsForm({ onKeepsAdded }: KeepsFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("transparent");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setSelectedColor("transparent");
    setIsColorPickerOpen(false);
    setIsExpanded(false);
  };

  async function handleSubmit(formData: FormData) {
    try {
      const data = Object.fromEntries(formData);
      const res = await api.post('/keeps', {
        title: data.title,
        description: data.description,
        color: selectedColor
      });
      console.log('keepFormData$$', res.data);
      onKeepsAdded(res.data.data.keep);
      resetForm();
    } catch (error) {
      console.error('error: ', error);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        const formData = new FormData(formRef.current);
        handleSubmit(formData);
      }
      
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
      }
    }

    if (isExpanded || isColorPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, isColorPickerOpen]);

  const ColorPicker = () => (
    <div 
      ref={colorPickerRef}
      className="absolute z-50  bg-white p-2 border rounded shadow-lg flex gap-2"
    >
      {Object.entries(colorOptions).map(([name, color]) => (
        <button
          key={name}
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            selectedColor === name ? "border-2 border-[#A142F4]" : "border border-transparent"
          } hover:border-black`}
          style={{
            backgroundColor: color
          }}
          title={name === "transparent" ? "No Color" : name}
          onClick={() => {
            setSelectedColor(name);
            setIsColorPickerOpen(false);
          }}
        >
          {color === "transparent" && (
            <img src={noColor} alt="No Color" className="w-4 h-4" />
          )}
        </button>
      ))}
    </div>
  );

  if (!isExpanded) {
    return (
      <div className="flex justify-center w-[600px] border rounded-lg">
        <input
          type="text"
          placeholder="Take a note..."
          onClick={() => setIsExpanded(true)}
          className="w-[400px] p-2 shadow-sm focus:outline-none"
        />
        <div className="flex gap-4 group">
          <img 
            src={newList} 
            alt="newList" 
            className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] w-[48px] h-[48px]"
          />
          <img 
            src={brush} 
            alt="brush" 
            className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] w-[48px] h-[48px]"
          />
          <img 
            src={addImage} 
            alt="addImage" 
            className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] w-[48px] h-[48px]"
          />
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col border bg-transparent p-4 rounded-lg shadow-lg mb-4 w-[800px] relative"
      style={{ backgroundColor: colorOptions[selectedColor] }}
    >
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className=" text-lg font-medium mb-2 focus:outline-none bg-transparent "
        />
        <img 
          src={pin} 
          alt="pin" 
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[6px] hover:bg-[#EBECEC]"
        />
      </div>
      <textarea
        placeholder="Take a note..."
        name="description"
        className="border-gray-300 text-sm resize-none mb-4 focus:outline-none bg-transparent"
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
            className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC] cursor-pointer"
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
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        /> 
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
        <div className="flex justify-end mx-5">
          <button
            type="button"
            onClick={() => {
              const formData = new FormData(formRef.current!);
              handleSubmit(formData);
            }}
            className="transparent text-black py-2 px-4 w-[86px] rounded-md hover:bg-secondary-light"
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
}