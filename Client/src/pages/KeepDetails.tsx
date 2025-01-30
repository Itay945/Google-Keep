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

  function handleKeepUpdate(keepId: string, updates: Partial<Keep>) {
    setKeep({ ...updates, _id: keepId } as Keep);
  }

  if (!keep) return null;
  return (
    <div className="fixed inset-0 w-full bg-black/50 z-50">
      <div className="flex justify-center items-center h-full">
        <div ref={modalRef} className="bg-white p-4 rounded-lg w-96">
          <h1 className="text-xl font-bold">Keep Details</h1>
          <p>Keep ID: {params.keepID}</p>
          <SingleKeep keep={keep} onKeepUpdate={handleKeepUpdate} />
          {/* <p>axios: </p> */}
        </div>
      </div>
    </div>
  );
}

export default KeepDetails;
