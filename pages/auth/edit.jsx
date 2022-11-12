import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState,useContext } from "react";
import { toast } from "react-toastify";
import {UserContext} from '../UserContext'

const Edit = () => {
  
  const {user,token,logout} = useContext(UserContext);
  const route = useRouter();
  const routeData = route.query;
  const [updateUserData,setUpdateUserData] = useState({name:"",phone:0,email:""}) 

  const getUser = async () => {
    await axios.post(process.env.NEXT_PUBLIC_API+'api/seller',{
        id:routeData.id
    }).then(res => setUpdateUserData({name:res.data.seller.name,phone:res.data.seller.phone,email:res.data.seller.email}))
  }

  const editProfile = async(e) => {
    e.preventDefault();
    await axios.post(process.env.NEXT_PUBLIC_API+'api/edit-profile',{
      id:routeData.id,
      name:updateUserData.name,
      phone:updateUserData.phone,
      email:updateUserData.email
    }).then(res => {
      if(res.data.status == "Ok"){
        route.push({
          pathname:"/",
          query:{user:updateUserData}
        },'user-data');
        toast.success("Your Profile is Updated Successfully.Please Log in again.")
      }
    })
    .catch(e => console.log(e));
    
  }

  useEffect(()=>{
    getUser();
  },[])

  return (
    <div className="mt-8">
    <h1 className="text-center text-2xl mb-8">Edit Your Profile</h1>
    <form action="" className="flex justify-center" onSubmit={editProfile}>
        <div className="border-2 border-gray-500 rounded-lg px-10 py-5 md:px-24 py-10">
            <div className="mb-4">
            <label htmlFor="name" className="font-normal block">Name</label>
            <input type="text" id="name" value={updateUserData.name} onChange={(e)=>setUpdateUserData({...updateUserData,name:e.target.value})} className="p-1 rounded-lg shadow-lg" />
            </div>
            <div className="mb-4">
            <label htmlFor="phone" className="font-normal block">Phone</label>
            <span>+95</span><input type="number" id="phone" value={updateUserData.phone} onChange={(e)=>setUpdateUserData({...updateUserData,phone:e.target.valueAsNumber})} className="p-1 rounded-lg shadow-lg" />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="font-normal block">Email</label>
            <input type="email" id="email" value={updateUserData.email} onChange={(e)=>setUpdateUserData({...updateUserData,email:e.target.value})} className="p-1 rounded-lg shadow-lg" />
            </div>
            <div className="flex justify-center">
            <button className="btn-outline-dark" type="submit">Edit</button>
            </div>
        </div>
    </form>
</div>
  )
}

export default Edit