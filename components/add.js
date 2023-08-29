import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Add(props) {
  const [details, setDetails] = useState({});
  const router = useRouter()
  const {id:username} = router.query

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  const getDateNow = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // month is zero-based (0-11)
    const year = String(currentDate.getFullYear());
    const hour = String(currentDate.getHours())
    const minute = String(currentDate.getMinutes())
    const millisec = String(currentDate.getMilliseconds())
    const formattedDate = `${hour}:${minute}:${millisec} ${day}/${month}/${year}`;
    return formattedDate
  }

  const handleAdd = async () => {
    const response = await fetch('/api/insertdb', {
      method:'PUT',
      headers: {
        'content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: username,
        idThread : details.id,
        description : details.des,
        date : details.date,
        dateCreated : getDateNow() ,
      })
    })

    setDetails({}); // Reset the details state to clear the inputs
    props.closeAdd()

  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };
  if (!props.isOpenAdd) {
    return null;
  }

  return (
    <div className="main inset-0 z-10 absolute -top-2 left-0 border h-full flex justify-center items-center w-[100%]">
      <div className="absolute inset-0 bg-white opacity-80 transition-opacity delay-700 "></div>
      <div className="addPopup relative w-[330px] h-[267px] bg-gray-300 p-2 space-y-2 flex flex-col justify-center rounded-md ">
        <div className="form flex flex-col relative ">
          <h1 className="text-blue-500 font-bold">Add your todo</h1>
          <label htmlFor="title" className="text-slate-800 text-[1.2rem] font-semibold">
            Description
          </label>
          <textarea
            id="title"
            col="20"
            rows="3"
            className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 text-black font-semibold"
            value={details.des || ''}
            onChange={e => {
              setDetails({id: generateRandomString(10), des: e.target.value });
            }}
            
            
          ></textarea>
          <label htmlFor="date" className="text-slate-800 text-[1.2rem] font-semibold">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="text-black font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            value={details.date || ''}
            onChange={e => setDetails({...details,date: e.target.value})}
            onKeyDown={handleKeyDown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 absolute -top-1 right-0 text-white cursor-pointer hover:text-blue-700 transition duration-700"
            onClick={props.closeAdd}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <button
          className="text-white px-4 py-2 text-[1rem] font-semibold bg-blue-500 rounded-md hover:bg-blue-700 transition-all border border-gray-300"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
}