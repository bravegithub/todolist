import React, { useState } from 'react'
import LoginSide from '@/components/loginSide'
import CreateAccount from '@/components/createAccount'

export default function Auth() {
  const [showLogin,setshowLogin] = useState(true)
  const [showCreate,setshowCreate] = useState(false)
  const showCreateSide = () => {
    setshowLogin(false)
    setshowCreate(true)
  }
  const showLoginSide = () => {
    setshowCreate(false)
    setshowLogin(true)
  }

  return (
    <div>
      <div className=" relative flex justify-center items-center">
        <div className="main-container border border-red-800  w-screen sm:w-[375px] max-h  sm:min-h-[667px]  p-2  relative bg-gray-100">
            <LoginSide showLogin = {showLogin} showCreateSide = {showCreateSide} />
            <CreateAccount showCreate = {showCreate} showLoginSide = {showLoginSide} />
        </div>
      </div>
    </div>
  )
}
