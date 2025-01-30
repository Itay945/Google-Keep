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
import { useRef, useEffect } from 'react';

function KeepDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed inset-0 w-full bg-black/50 z-50">
      <div className="flex justify-center items-center h-full">
        <div ref={modalRef} className="bg-white p-4 rounded-lg w-96">
          <h1 className="text-xl font-bold">Keep Details</h1>
          <p>Keep ID: {params.keepID}</p>
        </div>
      </div>
    </div>
  );
}

export default KeepDetails;
