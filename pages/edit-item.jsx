import axios from "axios";
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";


const EditItem = () => {

  const {user,token,logout} = useContext(UserContext);

  const route = useRouter();
  const routeData = route.query;
  const [userData,setUserData] = useState({});

  const cateRef = useRef();
  const [imageData,setImageData] = useState("");

  const [data,setData] = useState({name:routeData.name,price:routeData.price,description:routeData.description});
  
  const handleImage = (file) => {
    setImageData(file[0]);
  }

  const test = (e) => {
    e.preventDefault();
    const fData = new FormData();

    fData.append('id',routeData.id)
    fData.append('name',data.name)
    fData.append('image',imageData)
    fData.append('price',data.price)
    fData.append('des',data.description)
    fData.append('cate',cateRef.current.value)
    fData.append('user_id',userData.id)

    axios.post(process.env.NEXT_PUBLIC_API+'api/edit-item',fData)
    .then(res => {
      if(res.data.status == "OK"){
        route.push("/");
        toast.success("Your item is edited successfully!");
      }
    })
    .catch(e => console.log(e));

  }

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
    <>
    {!token && (
      <div className="w-full h-screen">
      </div>
    )}
    {token  && (
      <div className="mt-8">
          <h1 className="text-center text-2xl mb-8">Edit Your Item</h1>
          <form action="" className="flex justify-center" onSubmit={test}>
              <div className="border-2 border-gray-500 rounded-lg px-10 py-5 md:px-24 py-10">
                  <div className="mb-4">
                  <label htmlFor="name" className="font-normal block">ပစ္စည်းအမည်</label>
                  <input type="text" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} id="name" className="input p-1 rounded-lg shadow-lg w-full"  required/>
                  </div>
                  <div className="mb-4">
                  <label htmlFor="image" className="font-normal block">ပစ္စည်းဓာတ်ပုံ<span className="text-sm text-red-400">(If you do not select any photo,we will use old photo.)</span></label>
                  <input type="file" onChange={e => handleImage(e.target.files)} name="image" id="image" className="input py-3 border-none w-full" />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="price" className="font-normal block">ပစ္စည်းစျေးနှုန်း</label>
                  <input type="number" value={data.price} onChange={(e)=>setData({...data,price:e.target.value})} id="price" className="input p-1 rounded-lg shadow-lg w-full"  required/>
                  </div>
                  <div className="mb-4">
                  <label htmlFor="description" className="font-normal block">ပစ္စည်းအကြောင်း</label>
                  <textarea name="description" onChange={(e)=>setData({...data,description:e.target.value})} id="description" cols="30" rows="10" className="p-1 rounded-lg shadow-lg w-full"  required>{data.description}</textarea>
                  </div>
                  <div className="mb-4">
                  <label htmlFor="category" className="font-normal block">ပစ္စည်းအမျိုးအစား</label>
                  <select name="category" ref={cateRef} id="category" className="p-1 rounded-lg shadow-lg w-full" required>
                      <option value="" disabled>ပစ္စည်းအမျိုးအစားကို ရွေးပါ။</option>
                    {routeData.category == 1 && (
                    <>
                    <option value="1" selected>လျှပ်စစ်ပစ္စည်း</option>
                    <option value="2">အိမ်သုံးပစ္စည်း</option>
                    <option value="3">သွားလာရေး ယာဉ်</option>
                    <option value="4">အဝတ်အထည်</option>
                    <option value="5">Skin care ပစ္စည်း</option>
                    <option value="6">အခြား</option>
                    </>
                    )}
                    {routeData.category == 2 &&(
                    <>
                    <option value="1">လျှပ်စစ်ပစ္စည်း</option>
                    <option value="2" selected>အိမ်သုံးပစ္စည်း</option>
                    <option value="3">သွားလာရေး ယာဉ်</option>
                    <option value="4">အဝတ်အထည်</option>
                    <option value="5">Skin care ပစ္စည်း</option>
                    <option value="6">အခြား</option>
                    </>
                    )}
                    {routeData.category == 3 &&(
                    <>
                    <option value="1">လျှပ်စစ်ပစ္စည်း</option>
                    <option value="2">အိမ်သုံးပစ္စည်း</option>
                    <option value="3" selected>သွားလာရေး ယာဉ်</option>
                    <option value="4">အဝတ်အထည်</option>
                    <option value="5">Skin care ပစ္စည်း</option>
                    <option value="6">အခြား</option>
                    </>
                    )}
                    
                    {routeData.category == 4 && (
                    <>
                    <option value="1">လျှပ်စစ်ပစ္စည်း</option>
                    <option value="2">အိမ်သုံးပစ္စည်း</option>
                    <option value="3">သွားလာရေး ယာဉ်</option>
                    <option value="4" selected>အဝတ်အထည်</option>
                    <option value="5">Skin care ပစ္စည်း</option>
                    <option value="6">အခြား</option>
                    </>
                    )}
                    {routeData.category == 5 &&(
                    <>
                    <option value="1">လျှပ်စစ်ပစ္စည်း</option>
                    <option value="2">အိမ်သုံးပစ္စည်း</option>
                    <option value="3">သွားလာရေး ယာဉ်</option>
                    <option value="4">အဝတ်အထည်</option>
                    <option value="5" selected>Skin care ပစ္စည်း</option>
                    <option value="6">အခြား</option>
                    </>
                    )}
                    {routeData.category == 6 &&(
                    <>
                    <option value="1">လျှပ်စစ်ပစ္စည်း</option>
                    <option value="2">အိမ်သုံးပစ္စည်း</option>
                    <option value="3">သွားလာရေး ယာဉ်</option>
                    <option value="4">အဝတ်အထည်</option>
                    <option value="5">Skin care ပစ္စည်း</option>
                    <option value="6" selected>အခြား</option>
                    </>
                    )}
                  </select>
                  </div>
                  <div className="flex justify-center">
                  <button className="btn-outline-dark" type="submit">Edit</button>
                  </div>
              </div>
          </form>
      </div>
    )}
  </>
  )
}

export default EditItem