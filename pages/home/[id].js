import Profil from "@/components/profil"
import Container from "@/components/container"
import AddBtn from "@/components/addBtn"
import Add from "@/components/add"
import { useState } from "react"
import Edit from "@/components/edit"
import { useRouter } from "next/router"

export default function Home() {
  
  const [isOpenAdd,setOpenAdd] = useState(false);
  const [isOpenEdit,setOpenEdit] = useState(false);
  const [dataEdit,setDataEdit]  = useState({})
  const [isLoading , setIsLoading] = useState(false)
  const router = useRouter()
  const { id : username  } = router.query
  const openAdd = () =>{
    setOpenAdd(true) 
  }
  const closeAdd = () => {
    setOpenAdd(false) 
  }
  const openEdit = async (id) =>{
    setIsLoading(true)
    const response = await fetch('/api/getEditdb', {
      method:'PUT',
      headers: {
        'content-Type' : 'application/json',
      },
      body: JSON.stringify({
        idThread: id,
      })
    })
    setIsLoading(false)
    const data = await response.json()
    console.log(data.results[0].description);
    setDataEdit(data.results[0])

    setOpenEdit(true) 
  }
  const closeEdit = () => {
    console.log('clicked edit');
    setOpenEdit(false) 
  }
  const [details,setDetails] = useState({})
  const addSend = (detail) => {
    closeAdd();
    setDetails(detail);
  }
  return (
   <div className=" relative flex justify-center items-center">
      <div className="main-container w-screen sm:w-[375px] h-full  sm:min-h-[667px] bg-white p-2 flex flex-col space-y-2 relative">
        <Profil />
        <Container openEdit = {openEdit} details = {details} isLoading = {isLoading} username = {username} />
        <AddBtn openAdd = {openAdd} />
        <Add  closeAdd ={closeAdd} isOpenAdd = {isOpenAdd} />
        <Edit data ={dataEdit}  closeEdit ={closeEdit} isOpenEdit = {isOpenEdit}/> 
    </div>
    
   </div>
  )
}
