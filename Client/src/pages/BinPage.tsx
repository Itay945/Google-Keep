import { useEffect, useState } from 'react';
// import SingleKeepBinned from '../components/SingleKeepBinned';
import api from '../helpers/axiosApiToken';

export default function BinPage() {
  const [keepsBined, setkeepsBined] = useState();
  useEffect(() => {
    const fetchKeeps = async () => {
      try {
        const response = await api.get('/users/trash');
        console.log('response: ', response.data);
        setkeepsBined(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchKeeps();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        Notes in the Recycle Bin are deleted after 7 days.
        <button>Empty bin</button>
      </div>
      {/* <SingleKeepBinned /> */}
      {keepsBined.map((item) => {
        return <div>{item}</div>;
      })}
    </>
  );
}
