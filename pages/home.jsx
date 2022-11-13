import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Category from "../components/Category"
import Item from "../components/Item"
import Link from "next/link"
import { UserContext } from "../UserContext"

const HomePage = () => {

  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);

  const {searchData} = useContext(UserContext);

  const getItem = async () => {
     await axios.get(process.env.NEXT_PUBLIC_API+"api/items")
    .then(response => {
      setItems(response.data.items)      
    }).catch(error=>console.log(error))
    setLoading(false);
  }

  const toSearch = async (searchData) => {
    if(searchData == ""){
      getItem()
    }
    else{
      await axios.post(process.env.NEXT_PUBLIC_API+'api/search',{
        data:searchData
      }).then(res => {
        setItems(res.data.items);
      })
      .catch(e => console.log(e));
    }
  }

  useEffect(()=>{
    toSearch(searchData);
  },[searchData])

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

export default HomePage