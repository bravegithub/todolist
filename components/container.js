import { useEffect, useState } from "react"
import Thread from "./thread"
import Loading from "./loading";
export default function Container(props) {

    const [isLoading , setLoading] = useState(true)

    useEffect(()=>{
        (props.isLoading)? setLoading(true) : setLoading(false)
    },[props.isLoading]);
    const [val ,setVal] = useState([])
    useEffect(()=>{
         async function getThreads() {
            const threads = await fetch('/api/getdb', {
                method:'PUT',
                headers: {
                  'content-Type' : 'application/json',
                },
                body: JSON.stringify({
                  username: props.username,
                })
              })
            
            const data=await threads.json();
            
            setVal(data.results) 
            setLoading(false)   
        }
        getThreads()
        
    },[val , removeThread])
    
    async function removeThread(id) {
        setLoading(true)
        const response = await fetch('/api/deldb', {
            method:'PUT',
            headers: {
              'content-Type' : 'application/json',
            },
            body: JSON.stringify({
              idThread: id,
            })
          })
          setLoading(false)
    }
    
    return (
        <div className="w-full  bg-gray-100 h-[80%] sm:h/-/[450px] p-2 rounded-md  ">
            <h1 className="text-slate-700 font-semibold text-[1.2rem]">your todo</h1>
            <div className="threads relative mt-2 h-[400px] space-y-3  rounded-md overflow-auto">
                <Loading isLoading = {isLoading}  />
                {
                    val.map(t => <Thread  removeThread = {removeThread}  title = {t.description} id = {t.idThread} date = {t.date} openEdit = {props.openEdit}  />)
                }
            </div>
        </div>
    )
}


