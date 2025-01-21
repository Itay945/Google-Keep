// import axios from 'axios';
import api from '../helpers/axiosApiToken';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import google from "../assets/google.png";

function KeepsForm() {
  async function handlesubmit(formData) {
    try {
      const data = Object.fromEntries(formData);
      console.log('data: ', data);
      const res = await api.post('/users/addKeepToUser', {
        // title: data.title,
        // description: data.description,
        title: data.title,
        description: data.description,
        // color: 'Coral',
        // labels: ['work1', 'fun', 'food'],
        // isDeleted: false,
      });
      console.log('keepFormData', res.data);

      //   const newToken = res.data.data.token;
      //   console.log('userId: ', res.data.data.userId);

      //   login(newToken);

      //   navigate('/');
    } catch (error) {
      console.error('error: ', error);
    }
  }
  return (
    <form
      action={handlesubmit}
      //   onSubmit={handleSubmit}
      className="flex flex-col bg-white p-4 rounded-lg shadow-lg mb-4 w-full"
      //   ref={formRef} // Attach ref to the form/
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        // value={title}
        // onChange={(e) => setTitle(e.target.value)}
        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg font-medium mb-2"
      />
      <textarea
        placeholder="Take a note..."
        name="description"
        // value={content}
        // onChange={(e) => setContent(e.target.value)}
        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm resize-none mb-4"
        // rows="3"
      />
      <button
        type="submit"
        // onClick={handleCloseForm} // Close form on button click
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Close
      </button>
    </form>
  );
}

export default KeepsForm;
