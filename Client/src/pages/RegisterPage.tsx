import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import api from '../helpers/axiosApiToken';
import google from '../assets/google.png';
function RegisterPage() {
  const { logout, login } = useAuth();
  const navigate = useNavigate();
  async function handleSubmite(formData) {
    try {
      logout();
      const data = Object.fromEntries(formData);
      console.log('data: ', data);
      const res = await api.post('/users', {
        name: data.name,
        lastName: data.lastname,
        email: data.email,
        password: data.password,
      });
      console.log('data from register:', res.data.data);

      const newToken = res.data.data.token;
      console.log('newToken: ', newToken);

      localStorage.setItem('token', JSON.stringify(newToken));
      login(newToken);
      navigate('/');
    } catch (error) {
      console.error('error: ', error);
    }
  }
  return (
    <>
      <div className="bg-[#1E1F20] h-screen flex flex-col items-center justify-center">
        <Link to="/">{/* <button className="text-white border border-white mb-16">Work in Progress move to main keep page</button> */}</Link>
        <div>
          <div className="bg-[#0E0E0E] p-6 rounded-xl  shadow-lg max-w-sm w-full">
            <div className="flex justify-start w-[100%]">
              <img src={google} alt="google" className=" w-[40px] h-[40px] justify-start" />
            </div>
            <h1 className="text-[#E3E3E3] text-[32px]">Sign up</h1>
            <h2 className="text-[#E3E3E3] mb-2">Use your Google Account</h2>

            <form action={handleSubmite}>
              <div className="flex flex-col items-center gap-4">
                <input placeholder="name" type="text" name="name" className="border border-gray-600 text-xl bg-transparent text-[#A1C7C5]" />
                <input placeholder="last name" type="text" name="lastname" className="border border-gray-600 text-xl bg-transparent text-[#A1C7C5]" />
                <input placeholder="email" type="text" name="email" className="border border-gray-600 text-xl bg-transparent text-[#A1C7C5]" />
                <input placeholder="password" type="text" name="password" className="border border-gray-600 text-xl bg-transparent text-[#A1C7C5]" />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="flex justify-start items-center text-[#1E4482] py-2 px-4 mr-3 mb-3 mt-4 rounded-3xl bg-[#A8C7FA]">
                  submit
                </button>
                <Link to="/login">
                  <button className="flex justify-start items-center text-[#1E4482] py-2 px-4 mr-3 mb-3 mt-4 rounded-3xl bg-[#A8C7FA]">back</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
