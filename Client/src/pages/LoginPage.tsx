// import axios from 'axios';
import api from '../helpers/axiosApiToken';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import google from '../assets/google.png';
// hoveron dark mode color [#313236]
// import { useState } from 'react';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  // const [token, setToken] = useState('');

  async function handleSubmite(formData) {
    try {
      const data = Object.fromEntries(formData);
      console.log('data: ', data);
      const res = await api.post('/users/login', {
        email: data.email,
        password: data.password,
      });

      const newToken = res.data.data.token;
      console.log('userId: ', res.data.data.userId);

      login(newToken);

      navigate('/');
    } catch (error) {
      console.error('error: ', error);
    }
  }

  return (
    <>
      <div className="bg-[#1E1F20] h-screen flex items-center justify-center">
        <div className="bg-[#0E0E0E] p-6 rounded-xl  shadow-lg max-w-sm w-full">
          <div className="flex justify-start w-[100%]">
            <img
              src={google}
              alt="google"
              className=" w-[40px] h-[40px] justify-start"
            />
          </div>
          <h1 className="text-[#E3E3E3] text-[32px]">Sign in</h1>
          <h2 className="text-[#E3E3E3] mb-2">Use your Google Account</h2>
          <form action={handleSubmite}>
            <div className="flex flex-col items-center gap-4">
              <input
                placeholder="Email or phone"
                type="text"
                name="email"
                value="yoav@01"
                className="border border-gray-600 text-xl bg-transparent text-[#A1C7C5]"
              />
              <input
                placeholder="password"
                type="text"
                name="password"
                value="12345"
                className="border border-gray-600 text-xl bg-transparent text-[#A1C7C5] mb-4"
              />
            </div>
            <div className='flex justify-between mt-8'>
              <Link to="/register">
              <button  className="flex justify-start items-center text-[#1E4482] py-2 px-4 ml-2 mb-3 rounded-3xl bg-[#A8C7FA]">
                Sign-up
              </button>
              </Link>
            <button
              type="submit"
              className="flex justify-start items-center text-[#1E4482] py-2 px-4 mr-3 mb-3 rounded-3xl bg-[#A8C7FA]"
            >
              next
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

// import React, { useState } from 'react';

// function LoginPage() {
//     const [email, setEmail] = useState('');

//     async function handleSubmite(formData) {
//       const data = Object.fromEntries(formData);
//       console.log('data: ', data);
//       // const res = await axios.post('http://localhost:3000/users/login', data);
//     }

//     const handleEmailChange = (event) => {
//       setEmail(event.target.value);
//     };

//     return (
//       <>
//         <form action={handleSubmite}>
//           <div className="flex flex-col items-center gap-4">
//             <input
//               type="email"
//               placeholder="email"
//               value={email}
//               onChange={handleEmailChange}
//             />
//             <div>{email}</div>
//           </div>
//         </form>
//       </>
//     );
//   }

//   export default LoginPage;
