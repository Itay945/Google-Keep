import { Keep } from '../components/KeepsMain';
import api from '../helpers/axiosApiToken';

interface UpdateKeepResponse {
  success: boolean;
  data?: {
    keep: Keep;
    keeps: Keep[];
  };
  message?: string;
}

export const updateKeepPosition = async (
  keepId: string,
  newPosition: number,
  pin: boolean
): Promise<UpdateKeepResponse> => {
  debugger;
  try {
    const response = await api.patch(`/keeps/position/${keepId}`, {
      position: newPosition,
      pin,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating keep position:', error);
    throw error;
  }
};
