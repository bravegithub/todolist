import Link from "next/link";
import Add from "./add";

export default function AddBtn(props) {
    
    return (
        <div className="main flex justify-center items-center">
            <div className="bg-blue-500 w-full h-16 flex justify-center items-center rounded-md relative">
                <div className="rounded-full bg-blue-600 p-2 absolute top-[-35px] cursor-pointer"> 
                    {/* <Link href="/add"> */}
                            <svg onClick={props.openAdd} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-white  ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                    {/* </Link> */}
                    
                </div>
            </div>
        </div>
        
    )
}