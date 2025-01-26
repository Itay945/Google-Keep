import plusBell from './../assets/add_alert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import collaborator from './../assets/person_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import colors from './../assets/palette_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import threeDots from './../assets/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import pin from './../assets/keep_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import brush from './../assets/brush_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import addImage from "../assets/image_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import archive from './../assets/archive_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import redo from "../assets/redo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import undo from "../assets/undo_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
import newList from "../assets/check_box_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import api from '../helpers/axiosApiToken';
import { Keep } from './KeepsMain';
import { useEffect, useRef, useState } from 'react';

interface KeepsFormProps {
  onKeepsAdded: (newKeep: Keep) => void;
}

export default function KeepsForm({ onKeepsAdded }: KeepsFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string || '';
    const description = formData.get('description') as string || '';

    // Only submit if there's content
    if (title.trim() || description.trim()) {
      try {
        const res = await api.post('/keeps', {
          title,
          description,
        });
        onKeepsAdded(res.data.data.keep);
      } catch (error) {
        console.error('error: ', error);
      }
    }
    setIsExpanded(false);
  }

  // yoav's function without trim and submit on click outside.
  // async function handlesubmit(formData: FormData) {
  //   try {
  //     const data = Object.fromEntries(formData);
  //     console.log('data: ', data);
  //     const res = await api.post('/keeps', {
  //       title: data.title,
  //       description: data.description,
  //       // color: 'Coral',
  //       // labels: ['work1', 'fun', 'food']
  //       // isDeleted: false,
  //     });
  //     console.log('keepFormData$$', res.data);
  //     onKeepsAdded(res.data.data.keep);
  //   } catch (error) {
  //     console.error('error: ', error);
  //   }
  // }



  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        const formData = new FormData(formRef.current);
        handleSubmit(formData);
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  if (!isExpanded) {
    return (
      <div className="flex justify-center w-[600px] border rounded-lg ">
      <input
        type="text"
        placeholder="Take a note..."
        onClick={() => setIsExpanded(true)}
        className="w-[400px] p-2  shadow-sm focus:outline-none"
      />
      <div className='flex gap-4 group'>
      <img 
        src={newList} 
        alt="newList" 
        className=" transition-all duration-300  group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] w-[48px] h-[48px]"
       
      />
      <img 
        src={brush} 
        alt="brush" 
        className=" transition-all duration-300  group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] w-[48px] h-[48px]"
       
      />
      <img 
        src={addImage} 
        alt="addImage" 
        className=" transition-all duration-300  group-hover:translate-y-0 rounded-full p-[12px] hover:bg-[#EBECEC] w-[48px] h-[48px]"
       
      />
      </div>
    </div>
      
    );
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col border bg-transparent p-4 rounded-lg shadow-lg mb-4 w-[600px]"
    >
      <div className='flex justify-between'>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="border-gray-300 text-lg font-medium mb-2 focus:outline-none"
        />
        <img src={pin} alt="pin" />
      </div>
      <textarea
        placeholder="Take a note..."
        name="description"
        className="border-gray-300 text-sm resize-none mb-4 focus:outline-none"
      />
      <div className="flex gap-1 group">
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
        <img
          src={colors}
          alt="color palette"
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        />
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
        <img src={threeDots} alt="three dots options" 
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        /> 
        <img src={undo} alt="undo" 
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        /> 
        <img src={redo} alt="redo" 
          className="transition-all duration-300 group-hover:translate-y-0 rounded-full p-[12px] scale-[0.8] hover:bg-[#EBECEC]"
        /> 
        <div className='flex justify-end mx-5'>
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