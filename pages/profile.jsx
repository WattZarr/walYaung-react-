import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { UserContext } from "./UserContext"
import {FaUserCircle,FaPhoneAlt} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import Link from "next/link";

const Profile = () => {

  const {user,token,logout} = useContext(UserContext);
  const route = useRouter();
  const [userData,setUserData] = useState({});

  

  const isLogIn = () => {
    if(!token){
      route.push("/");
      toast.error("You must Log in to your account!")
    } 
    if(token){
      setUserData(JSON.parse(user));
    }
  }

  useEffect(()=>{
    isLogIn()
  },[route])

  return (
    <div className="mt-4 flex justify-center">
      {!token && (
        <>
          <div className="w-full h-full">

          </div>
        </>
      )}
      <div className="h-screen w-full">
        <div className="mx-auto px-3 py-5 border-2 border-gray-400 rounded-lg text-center w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <hr />
            <div className="flex items-center justify-between mx-auto mb-4 w-1/2 md:w-1/3">
              <FaUserCircle></FaUserCircle>
              <p className="font-normal">{userData?.name}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between mx-auto mb-4 w-1/2 md:w-1/3">
              <HiOutlineMail></HiOutlineMail>
              <p className="font-normal">{userData?.email}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between mx-auto mb-4 w-1/2 md:w-1/3">
              <FaPhoneAlt></FaPhoneAlt>
              <p className="font-normal">0{userData?.phone}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <Link  href={{pathname:"/auth/change-password",query:{id:userData.id}}}><button className="btn-outline-dark">Change Password</button></Link>
              <Link href={{pathname:"/auth/edit",query:{id:userData.id}}}><button className="btn-outline-dark">Edit Your Profile</button></Link>
            </div>
            <hr />
        </div>
      </div>
    </div>
  )
}

export default Profile