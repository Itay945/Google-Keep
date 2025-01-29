// import KeepsMain from '../components/KeepsMain';
import { useState, useEffect } from "react";
import api from "../helpers/axiosApiToken";
import { useAuth } from "../hooks/useAuth";
import BinMain from "../components/BinMain";
import { Keep } from "../components/KeepsMain";
function BinPage() {
  const { loggedInUser } = useAuth();
  console.log("loggedInUser from useHuth: ", loggedInUser);

  const [keeps, setKeeps] = useState<Keep[]>([]);

  useEffect(() => {
    fetchKeeps();
  }, [loggedInUser]);

  const fetchKeeps = async () => {
    try {
      if (!loggedInUser) {
        return;
      }
      const response = await api.get(`/keeps/trash`);
      console.log("response: ", response.data.data.keeps);
      setKeeps(response.data.data.keeps);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <BinMain keeps={keeps} fetchKeeps={fetchKeeps} />
    </div>
  );
}

export default BinPage;
