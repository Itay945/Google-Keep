import api from "./axiosApiToken";

export const handlePinToggle = async (id: string, currentPinState: boolean, updateLocalState: (newPinState: boolean) => void): Promise<void> => {
  try {
    // Toggle the pin state
    const newPinState = !currentPinState;

    // Make an API request to update the pin state
    const response = await api.put(`/keeps/${id}`, {
      pin: newPinState,
    });

    if (response.status !== 200) {
      throw new Error("Failed to update pin state");
    }

    console.log("Pin state updated successfully!", newPinState);

    updateLocalState(newPinState);
    return response.data;
  } catch (error) {
    console.error("Error updating pin state:", error);
  }
};
