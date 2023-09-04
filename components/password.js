import React, { useState } from 'react'
import loginIllustrator from '../img/ullustra1.jpg'
import Loading from '@/components/loading'

export default function CreateAccount(props) {
    const [details,setDetails] = useState({})
    const [isLoading,setLoading] = useState(false)
    const handleCreate = async () => {
        setLoading(true)
        const response = await fetch('/api/createaccount', {
          method:'PUT',
          headers: {
            'content-Type' : 'application/json',
          },
          body: JSON.stringify({
            idUser: details.idUser,
            username : details.username,
            password : details.password,
          })
        })
        setLoading(false)
        setDetails({});
      };

      if(!props.showCreate) return null
  return (
    <div>
      <div className='illustrator w-full h-[50%]  flex justify-center overflow-hidden '>
                 <img src={loginIllustrator.src} className='w-[75%] h-full rounded-md ' alt='loginIllustrator'/>
            </div>
            <div className='login relative flex flex-col justify-center items-center space-y-2   bg-white rounded-md'>
            <Loading isLoading = {isLoading} />
            <h1 className="text-blue-600 font-bold text-[2rem]">Sign up</h1>
            <div className='inputs flex flex-col space-y-2 p-2 w-[80%]  '>
                <label for="date" className="text-slate-700 text-[1.1rem] font-semibold">email</label> 
                <input type='text' id="title" col="20" rows="3"
                required
                 className=" rounded-md p-2 bg-gray-200 border border-white focus:outline-none focus:ring focus:border-blue-500 text-black font-semibold"
                 value={details.idUser || ''}
                onChange={e => {
                setDetails({idUser:e.target.value });
                }}
                 />
                <label for="date" className="text-slate-700 text-[1.1rem] font-semibold">change username</label> 
                <input type='text' id="title" col="20" rows="3" 
                required
                className=" rounded-md p-2 bg-gray-200 border border-white focus:outline-none focus:ring focus:border-blue-500 text-black font-semibold"
                value={details.username || ''}
                onChange={e => {
                setDetails({...details ,username:e.target.value });
                }}
                />
                <label for="date" className="text-slate-700 text-[1.1rem] font-semibold">change password</label> 
                <input type='password' id="title" col="20" rows="3" 
                className=" rounded-md p-2 bg-gray-200 border border-white focus:outline-none focus:ring focus:border-blue-500 text-black font-semibold"
                value={details.password || ''}
                onChange={e => {
                setDetails({...details ,password:e.target.value });
                }}
                />
                <button className="text-white  px-4 py-2 text-[1rem] font-semibold bg-blue-500 rounded-md hover:bg-blue-700 transition-all border border-gray-300"
                onClick={handleCreate}
                >create account</button>
            </div>
            <div className='flex justify-between w-[70%]'>
              <span className='text-blue-500 cursor-pointer'>forget password?</span>
              <span className='text-blue-500 cursor-pointer' onClick={props.showLoginSide}>have account?</span>
            </div>
            </div>
    </div>
  )
}
