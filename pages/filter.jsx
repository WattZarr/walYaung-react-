import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Category from "../components/Category";
import Link from "next/link";
import Item from '../components/Item';

const Filter = () => {
  
  const route = useRouter();
  const routeData = route.query;
  const [items,setItems] = useState([]);

  const filterItem = async() => {
    await axios.post(process.env.NEXT_PUBLIC_API+"api/filter",{
        id:routeData.id
    }).then(res => setItems(res.data.items))
  }

  useEffect(()=>{
    filterItem();
  },[routeData])

  return (
    <div className="my-12">
    <Category></Category>
    <div className="my-8 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {items?.map(item => (
        <Link href={{pathname:`/${item.id}`,query:item}} key={item.id}>
          <Item value={item}></Item>
        </Link>
      ))}
    </div>
        
</div>
  )
}

export default Filter