// import { useParams } from 'react-router-dom';

// function KeepDetails() {
//   const params = useParams();
//   console.log('params: ', params);
//   return (
//     <div className="fixed inset-0 w-full bg-black/50 z-50">
//       <div className="flex justify-center items-center h-full">
//         <div className="bg-white p-4 rounded-lg w-96">
//           <h1 className="text-xl font-bold">Keep Details</h1>
//           <p>Keep ID: {params.keepID}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KeepDetails;

import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import api from '../helpers/axiosApiToken';
import SingleKeep from '../components/SingleKeep';
import { Keep } from '../components/KeepsMain';
import KeepsForm from '../components/KeepsForm';
import KeepsFormEdit from '../components/KeepsFormEdit';

function KeepDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [keep, setKeep] = useState<Keep | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        navigate('/');
      }
    }

    // Add click event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  useEffect(() => {
    async function fetchKeep() {
      try {
        const res = await api.get(`/keeps/${params.keepID}`);
        console.log('res: ', res.data.data.keep);
        setKeep(res.data.data.keep);
      } catch (error) {
        console.error(error);
      }
    }
    fetchKeep();
  }, []);

  async function handleKeepUpdate(keepId: string, updates: Partial<Keep>) {
    try {
      const response = await api.put(`/keeps/${keepId}`, updates);
      if (response.data) {
        setKeep((prevKeep) => ({
          ...prevKeep!,
          ...updates,
        }));

        const event = new CustomEvent('keepUpdated', {
          detail: { keepId, updates },
        });
        document.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Failed to update keep:', error);
    }
  }

  const handleClose = () => {
    navigate('/');
  };
  if (!keep) return null;
  console.log('keep: ', keep);

  return (
    <div className="fixed inset-0 w-full bg-black/50 z-50">
      <div className="flex justify-center items-center h-full">
        <div ref={modalRef} className=" p-4 rounded-lg w-96">
          {/* <h1 className="text-xl font-bold">Keep Details</h1> */}
          {/* <p>Keep ID: {params.keepID}</p> */}
          <KeepsFormEdit
            keep={keep}
            handleKeepUpdate={handleKeepUpdate}
            handleClose={handleClose}
          />
          {/* <SingleKeep keep={keep} onKeepUpdate={handleKeepUpdate} /> */}
          {/* <p>axios: </p> */}
        </div>
      </div>
    </div>
  );
}

export default KeepDetails;
