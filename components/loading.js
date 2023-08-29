import { useState, useEffect } from 'react';

export default function Loading(props) {

    if(!props.isLoading ) return null
    
    return (
        
        <div className="main-container absolute top-0  w-[100%]  h-[400px] bg-transparent p-2 flex flex-col space-y-2 ">
        
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin z-80 rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        </div>
        
    )
}
