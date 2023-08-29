import React, { useState } from 'react';
import loginIllustrator from '../img/ullustra.jpg';
import Loading from './loading';
import { useRouter } from 'next/router';

export default function LoginSide(props) {
  const [details, setDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    if (details.username != null && details.password != null) {
      const response = await fetch('/api/loginCheck', {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: (details.username).toLowerCase(),
          password: details.password,
        }),
      });

      const data = await response.json();
      if (data.results.length === 0) {
        setInvalid(true);
      } else {
        setInvalid(false);
        router.push('../home/[id]', `../home/${details.username}`);
      }

      setLoading(false);
      setDetails({});
    }

    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  if (!props.showLogin) return null;

  return (
    <div>
      <div className='illustrator sm:w-full sm:h-[50%] flex justify-center '>
        <img src={loginIllustrator.src} className='w-[90%] sm:w-[95%] h-full rounded-md ' />
      </div>
      <div className='login relative flex flex-col justify-center items-center space-y-2 bg-white rounded-md'>
        <Loading isLoading={isLoading} />
        <h1 className='text-blue-600 font-bold text-[2rem]'>Sign in</h1>
        <div className='inputs flex flex-col space-y-2 p-2 w-[80%] '>
          <label htmlFor='username' className='text-slate-700 text-[1.1rem] font-semibold'>
            Username
          </label>
          <input
            type='text'
            id='username'
            required
            className='rounded-md p-2 bg-gray-200 border border-white focus:outline-none focus:ring focus:border-blue-500 text-slate-600  font-semibold'
            value={details.username || ''}
            onChange={(e) => {
              setDetails({ ...details, username: e.target.value });
            }}
            onKeyDown={handleKeyDown}
          />
          <span className='text-sm text-red-800'>{invalid ? 'Invalid username' : ''}</span>
          <label htmlFor='password' className='text-slate-700 text-[1.1rem] font-semibold'>
            Password
          </label>
          <input
            type='password'
            id='password'
            required
            className='rounded-md p-2 bg-gray-200 border border-white focus:outline-none focus:ring focus:border-blue-500 text-slate-600 font-semibold'
            value={details.password || ''}
            onChange={(e) => {
              setDetails({ ...details, password: e.target.value });
            }}
            onKeyDown={handleKeyDown}
          />
          <span className='text-sm text-red-800'>{invalid ? 'Invalid password' : ''}</span>
          <button
            onClick={handleLogin}
            className='text-white px-4 py-2 text-[1rem] font-semibold bg-blue-500 rounded-md hover:bg-blue-700 transition-all border border-gray-300'
          >
            Login
          </button>
        </div>
        <div className='flex justify-between w-[70%]'>
          <span className='text-blue-500 cursor-pointer' onClick={props.showCreateSide}>
            Create account?
          </span>
        </div>
      </div>
    </div>
  );
}
