import axios from 'axios';

function LoginPage() {
  async function handleSubmite(formData) {
    const data = Object.fromEntries(formData);
    console.log('data: ', data);
    const res = await axios.post('http://localhost:3000/users/login', {
      email: data.email,
      password: data.password,
    });
    console.log('res: ', res.data);
  }

  return (
    <>
      <h1>Login Page</h1>
      <form action={handleSubmite}>
        <div className="flex flex-col items-center gap-4">
          <input
            placeholder="email"
            type="text"
            name="email"
            className="border border-gray-600 text-xl"
          />
          <input
            placeholder="password"
            type="text"
            name="password"
            className="border border-gray-600 text-xl"
          />
        </div>
        <button
          type="submit"
          className=" rounded-md max-w-24 p-2 border-solid border-2  border-red-700 bg-yellow-100"
        >
          submit
        </button>
      </form>
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
