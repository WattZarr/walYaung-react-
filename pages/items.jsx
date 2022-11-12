import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import {UserContext} from "../pages/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const Items = () => {

  const {user,token,logout} = useContext(UserContext);
  const [userData,setUserData] = useState({});
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true)
  const route = useRouter();

  const getItemData = async () => {
    axios.post(process.env.NEXT_PUBLIC_API+'api/item-list',{
      id:userData.id
    }).then(res => setData(res.data.item))
    .catch(e => console.log(e))
    setLoading(false);
  }


  const isLogin = () => {
    if(!token){
      route.push("/");
      toast.error("You must log in to your account")
    }
    if(token){
      setUserData(JSON.parse(user))
    }
  }

  useEffect(()=>{
    isLogin();
  },[])

  useEffect(()=>{
    getItemData()
  },[loading])

  return (
    <>
    {!token && (
      <div className="w-full h-screen">
      </div>
    )}
    {token  && (
      <div className='my-4'>
        <h1 className="text-2xl font-extrabold text-center mb-4">ပစ္စည်းစာရင်းများ</h1>
      <Table data={data}></Table>
      </div>
    )}
  </>
  );
}

export default Items