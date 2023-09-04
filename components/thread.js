import { useRef, useEffect, useState } from "react"

export default function Thread(props) {
    let edit;
    
    function show() {
        editRef.current.classList.toggle('hidden') 
    }
    const editRef = useRef(null);

    useEffect(() => {
      editRef.current = document.querySelector(`#${props.id}`);
    }, [props.id , show ]);

    return(
        <div className="thread w-full min-h-[70px] bg-white rounded-md p-2 space-y-1 relative">
            <div className="text-black font-semibold text-[1.2rem] overflow-hidden break-words">{props.title}</div>
            <div className="date flex flex-row space-x-1 items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-black w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-black text-sm font-medium">{props.date}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete w-6 h-6 text-red-600 cursor-pointer" onClick={e => props.removeThread(props.id)}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black cursor-pointer" onClick={e => show()}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg> 
                
            </div>
             <div id={props.id} className=" cursor-pointer w-[60px] h-[30px] bg-blue-500 text-white text-sm  rounded absolute bottom-4 left-24  justify-center space-x-2 items-center flex hidden">
                <button onClick={() => {
                    props.openEdit(props.id);
                    show();
                }} >edit</button>
              <button onClick={e => show()}  >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

              </button>
            </div>
        </div>
    )
}