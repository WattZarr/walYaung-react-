import axios from "axios";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

const SellItem = () => {

  const {user,token,logout} = useContext(UserContext);
  const [userData,setUserData] = useState();
  const route = useRouter();
  
  const nameRef = useRef();
  const priceRef = useRef();
  const desRef = useRef();
  const cateRef = useRef();

  const [imageData,setImageData] = useState("");

  const isLogin = () => {
    if(!token){
      route.push("/");
      toast.error("You must log in to your account")
    }
    if(token){
      setUserData(JSON.parse(user))
    }
  }
  
  const handleImage = (file) => {
    setImageData(file[0]);
  }

  const sell = async (e) => {
    e.preventDefault();
    const fData = new FormData();

    fData.append('id',userData.id)
    fData.append('name',nameRef.current.value)
    fData.append('image',imageData)
    fData.append('price',priceRef.current.value)
    fData.append('des',desRef.current.value)
    fData.append('cate',cateRef.current.value)

    axios.post(process.env.NEXT_PUBLIC_API+'api/sell',fData)
    .then(res => {
      if(res.data.status == "OK"){
        route.push("/");
        toast.success("Your item is added successfully!");
      }
    })
    .catch(e => console.log(e));
  
  }

  useEffect(()=>{
    isLogin()
  },[token]);

  return (
    <>
    {!token && (
      <div className="w-full h-screen">
      </div>
    )}
    {token  && (
      <div className="mt-8">
          <h1 className="text-center text-2xl mb-8">ပစ္စည်းရောင်းရန်</h1>
          <form action="" className="flex justify-center" onSubmit={sell}>
              <div className="border-2 border-gray-500 rounded-lg px-10 py-5 md:px-24 py-10">
                  <div className="mb-4">
                  <label htmlFor="name" className="font-normal block">ပစ္စည်းအမည်</label>
                  <input type="text" ref={nameRef} id="name" className="input p-1 rounded-lg shadow-lg w-full"  required/>
                  </div>
                  <div className="mb-4">
                  <label htmlFor="image" className="font-normal block">ပစ္စည်းဓာတ်ပုံ</label>
                  <input type="file"name="image" onChange={e => handleImage(e.target.files)} id="image" className="input py-3 border-none w-full" />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="price" className="font-normal block">ပစ္စည်းစျေးနှုန်း</label>
                  <input type="number" ref={priceRef} id="price" className="input p-1 rounded-lg shadow-lg w-full"  required/>
                  </div>
                  <div className="mb-4">
                  <label htmlFor="description" className="font-normal block">ပစ္စည်းအကြောင်း</label>
                  <textarea name="description" ref={desRef} id="description" cols="30" rows="10" className="p-1 rounded-lg shadow-lg w-full" required></textarea>
                  </div>
                  <div className="mb-4">
                  <label htmlFor="category" className="font-normal block">ပစ္စည်းအမျိုးအစား</label>
                  <select name="category" ref={cateRef} id="category" className="p-1 rounded-lg shadow-lg w-full" required>
                      <option value="" selected disabled>ပစ္စည်းအမျိုးအစားကို ရွေးပါ။</option>
                      <option value="1">လျှပ်စစ်ပစ္စည်း</option>
                      <option value="2">အိမ်သုံးပစ္စည်း</option>
                      <option value="3">သွားလာရေး ယာဉ်</option>
                      <option value="4">အဝတ်အထည်</option>
                      <option value="5">Skin care ပစ္စည်း</option>
                      <option value="6">အခြား</option>
                  </select>
                  </div>
                  <div className="flex justify-center">
                  <button className="btn-outline-dark" type="submit">ရောင်းပါ</button>
                  </div>
              </div>
          </form>
      </div>
    )}
  </>
  )
}

export default SellItem