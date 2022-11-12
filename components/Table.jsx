import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const Table = ({data}) => {

  const route = useRouter();

  const del = (id) => {
      axios.post(process.env.NEXT_PUBLIC_API+'api/delete-item',{
        id:id
      }).then(res => {
        if(res.data.status == "OK"){
          route.push("/");
          toast.success("Your item is deleted")
        }
      }).catch(e => console.log(e))
  }

  const sold = (id) => {
    axios.post(process.env.NEXT_PUBLIC_API+'api/mark-sold-item',{
      id:id
    }).then(res => {
      if(res.data.status == "OK"){
        route.push("/");
        toast.success("Your item is marked as sold!")
      }
    }).catch(e => console.log(e))
  }

  const editItem = (id,item_name,image,price,description,category) => {
    route.push({
      pathname:"/edit-item",
      query:{
        id:id,
        name:item_name,
        image:image,
        price:price,
        description:description,
        category:category
      }
    },'item-data');
  }

  return (
    <table className="w-full table-auto border-2 border-gray-400">
    <thead >
        <tr className="border-2 border-gray-400">
        <th className="th-cell">ပစ္စည်းအမည်</th>
        <th className="th-cell w-1/5">ပစ္စည်းဓာတ်ပုံ</th>
        <th className="th-cell">ပစ္စည်းစျေးနှုန်း</th>
        <th className="th-cell">ပစ္စည်းအကြောင်း</th>
        <th className="th-cell">ပစ္စည်းအမျိုးအစား</th>
        </tr>
    </thead>
    <tbody>
        {data?.map(i => (
        <tr className="border-2 border-gray-400" key={i.id}>
            <td className="td-cell">{i.item_name}</td>
            <td className="td-cell cell-img"><img src={process.env.NEXT_PUBLIC_API+`items/${i.image}`} className="w-2/5"/></td>
            <td className="td-cell">{i.price}</td>
            <td className="td-cell">{i.description}</td>
            <td className="td-cell">
                {i.category == 1 && "လျှပ်စစ်ပစ္စည်း"}
                {i.category == 2 && "အိမ်သုံးပစ္စည်း"}
                {i.category == 3 && "သွားလာရေး ယာဉ်"}
                {i.category == 4 && "အဝတ်အထည်"}
                {i.category == 5 && "Skin care ပစ္စည်း"}
                {i.category == 6 && "အခြား"}
            </td>
            {i.is_sold == 0 && (
            <>
              <td className="td-cell"><button className="btn-outline-blue" onClick={()=>editItem(i.id,i.item_name,i.image,i.price,i.description,i.category)}>Edit</button></td>
              <td className="td-cell"><button className="btn-outline-green" onClick={()=>sold(i.id)}>Sold</button></td>
            </>
            )}
            <td className="td-cell"><button className="btn-outline-danger" onClick={()=>del(i.id)}>Delete</button></td>
        </tr>
        ))}
    </tbody>
    </table>
  )
}

export default Table