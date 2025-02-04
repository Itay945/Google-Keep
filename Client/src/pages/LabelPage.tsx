import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../helpers/axiosApiToken';

export default function LabelPage() {
  const [keep, setKeep] = useState<Keep | null>(null);
  const params = useParams();
  useEffect(() => {
    async function fetchKeep() {
      try {
        const res = await api.get(`/keeps/labels/${params.labelName}`);
        console.log('res: ', res.data.data);
        setKeep(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchKeep();
  }, []);
  return (
    <>
      <div>LabelPage {params.labelName} </div>
    </>
  );
}
