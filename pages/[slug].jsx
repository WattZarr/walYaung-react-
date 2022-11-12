import axios from "axios";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Item from "../components/Item";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

const Detail = () => {

    const {user,token,logout} = useContext(UserContext);

    const route = useRouter();
    const routeData = route.query;

    const [category,setCategory] = useState("");
    const [seller,setSeller] = useState({});
    const [sameCateItem,setSameCateItem] = useState([]);

    const isLogin = () => {
        if(!token){
            route.push("/auth/login")
        }
    }

    const getSeller = async() => {
        axios.post(process.env.NEXT_PUBLIC_API+"api/seller",{
            id:routeData.user_id
        })
        .then(res => setSeller(res.data.seller));
    }

    const getSameCateItem = async() => {
        axios.post(process.env.NEXT_PUBLIC_API+"api/same-category-item",{
            category:routeData.category,
            id:routeData.id
        })
        .then(res => setSameCateItem(res.data.item));
    }

    useEffect(()=>{
        isLogin();
    })

    useEffect(()=>{
        getSeller();
        getSameCateItem();
        if(routeData.category == 1) setCategory("လျှပ်စစ်ပစ္စည်း")
        if(routeData.category == 2) setCategory("အိမ်သုံးပစ္စည်း")
        if(routeData.category == 3) setCategory("သွားလာရေး ယာဉ်")
        if(routeData.category == 4) setCategory("အဝတ်အထည်")
        if(routeData.category == 5) setCategory("Skin care ပစ္စည်း")
        if(routeData.category == 6) setCategory("အခြား") 
    },[routeData])

  return (
  <>
  {!token &&(
    <div className="w-full h-full">

    </div>
  )}
  {token && (
    <>
        <div className="my-8 grid md:grid-cols-2 gap-10">
        <img src={process.env.NEXT_PUBLIC_API+`items/${routeData.image}`}/>
        <div className="my-4">
            <h1 className="text-2xl border-l-8 border-black my-3">{routeData.item_name}</h1>
            <p className="text-normal font-light my-3">{routeData.price} ကျပ်</p>
            <hr />
            <h1 className="text-xl my-3">ရောင်းသူ</h1>
            <p className="text-normal font-light my-3">{seller.name}</p>
            <hr />
            <h1 className="text-xl my-3">ပစ္စည်းအကြောင်း</h1>
            <p className="text-normal font-light my-3">{routeData.description}</p>
            <hr />
            <h1 className="text-xl my-3">ပစ္စည်းအမျိုးအစား</h1>
            <p className="text-normal font-light my-3">{category}</p>
            <hr />
            <h1 className="text-xl my-3">ဆက်သွယ်ရန်</h1>
            <a href={`tel:+95${seller.phone}`} className="text-normal font-light my-3">+95{seller.phone}</a>
            <hr />
            <Link href={"/"}><button className="btn-outline-dark my-3 w-full">ပင်မစာမျက်နှာသို့</button></Link>
        </div>
    </div>
    <div className="my-4">
        <h1 className="text-2xl border-l-8 border-black my-3">အမျိုးအစားတူပစ္စည်းများ</h1>
        <div className="grid grid-cols-3 gap-3">
            {sameCateItem?.map(item => (
                <Link href={{pathname:`/${item.id}`,query:item}} key={item.id}>
                    <Item value={item}></Item>
                </Link>
            ))}
        </div>
    </div>
    </>
  )}
    
  </>
  )
}

export default Detail