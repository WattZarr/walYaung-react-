import axios from "axios";
import { useRouter } from "next/router";
import { useState, useRef } from "react"
import { toast } from "react-toastify";

const ChangePassword = () => {

  const route = useRouter();
  const routeData = route.query;

  const [status,setStatus] = useState();

  const oldRef = useRef();
  const newRef = useRef();
  const confirmRef = useRef();

  const change = async (e) => {
    e.preventDefault();

    axios.post(process.env.NEXT_PUBLIC_API+'api/change-password',{
        id:routeData.id,
        old:oldRef.current.value,
        new:newRef.current.value,
        confirm:confirmRef.current.value, 
    }).then(res => {
        if(res.data.status == "not match"){
            toast.error("Your old Password is incorrect!");
        }

        if(res.data.status == "different"){
            toast.error("New Password does not match with Confirm Password");
        }

        if(res.data.status == "OK"){
            toast.success("Your Password is changed");
            route.push("/");
        }
    })
    .catch(e => console.log(e));

    oldRef.current.value = "";
    newRef.current.value = "";
    confirmRef.current.value = "";
    
  }

  return (
    <div className="mt-8">
    <h1 className="text-center text-2xl mb-8">Change Your Password</h1>
    {/* {status == "not match" && (
        <p className="text-red-700 text-center mb-4">Your old password is incorrect</p>
    )} */}
    <form action="" className="flex justify-center" onSubmit={change}>
        <div className="border-2 border-gray-500 rounded-lg px-10 py-5 md:px-24 py-10">
            <div className="mb-4">
            <label htmlFor="old" className="font-normal block">Old Password</label>
            <input type="password" ref={oldRef} id="old" className="p-1 rounded-lg shadow-lg" minlength="8" required />
            </div>
            <div className="mb-4">
            <label htmlFor="new" className="font-normal block">New Password</label>
            <input type="password" ref={newRef} id="new" className="p-1 rounded-lg shadow-lg" minlength="8" required />
            </div>
            <div className="mb-4">
            <label htmlFor="confirm" className="font-normal block">Confirm Password</label>
            <input type="password" ref={confirmRef} id="confirm" className="p-1 rounded-lg shadow-lg" minlength="8" required />
            </div>
            <div className="flex justify-center">
            <button className="btn-outline-dark" type="submit">Change</button>
            </div>
        </div>
    </form>
</div>
  )
}

export default ChangePassword