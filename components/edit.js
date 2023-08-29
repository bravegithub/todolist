import { useEffect, useState } from "react";

export default function Edit(props) {
  const [details, setDetails] = useState(props.data);
  const handleEdit = async () => {
      const response = await fetch('/api/updatedb', {
        method:'PUT',
        headers: {
          'content-Type' : 'application/json',
        },
        body: JSON.stringify({
          idThread : props.data.idThread,
          description : details.description == undefined ? props.data.description : details.description,
          date : details.date == undefined ? props.data.date : details.date,
        })
      })
  
      setDetails({}); // Reset the details state to clear the inputs
      props.closeEdit()
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleEdit();
      }
    };
  if(!props.isOpenEdit) {
    return null
}
  return (
      <div className="main  inset-0 z-10 absolute -top-2 left-0 border h-full    flex justify-center items-center  w-[100%] ">
        <div className="absolute inset-0  bg-white opacity-80 transition-opacity delay-700 "></div>
        <div className="addPopup relative   w-[330px] h-[267px]  bg-gray-300 p-2 space-y-2 flex flex-col justify-center rounded-md ">
          <div className="form flex flex-col relative   ">
                <h1 className="text-blue-500 font-bold">Edit your todo</h1>
                <label for="title" className="text-slate-800 text-[1.2rem] font-semibold">change description</label>
                <textarea
                  id="title"
                  col="20"
                  rows="3"
                  className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 text-black font-semibold"
                  defaultValue={props.data.description}
                  onChange={e => {
                    setDetails({description: e.target.value });
                  }}
                  
                ></textarea>
                <label for="date" className="text-slate-800 text-[1.2rem] font-semibold">change date</label>
                <input
                  type="date"
                  id="date"
                  className="text-black font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                  defaultValue={props.data.date}
                  onChange={e => setDetails({...details,date: e.target.value})}
                  onKeyDown={handleKeyDown}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute -top-1 right-0 text-white cursor-pointer hover:text-blue-700 transition duration-700 " onClick={props.closeEdit}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </div>
            <button className="text-white  px-4 py-2 text-[1rem] font-semibold bg-blue-500 rounded-md hover:bg-blue-700 transition-all border border-gray-300"
            onClick={handleEdit}
            >Edit</button>
        </div>
   </div>

  )
}
