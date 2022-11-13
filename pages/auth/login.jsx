import Link from "next/link"
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const route = useRouter();

  const login = (e) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_API+'api/user/login',{
      email:email,
      password:password
    }).then(response=>{
      if(response.data.token == null){
        setError("Log in fail.Please try again!")
      }
      else{
        const userData = JSON.stringify(response.data.user)
        const token =  response.data.token
        route.push({
          pathname:"/",
          query:{user:userData,token:token}
        },'user-data');
        toast.success("Log in Success")

      }
    }).catch(error=>{
      console.log(error)
    }) 
  }
  


  return (
    <div className="mt-8">
        <h1 className="text-center text-2xl mb-8">Welcome to WalYaung</h1>
      <form action="" className="flex justify-center" onSubmit={login}>
          <div className="border-2 border-gray-500 rounded-lg px-10 py-5 md:px-24 py-10">
          <h1 className="font-normal text-center text-xl mb-4">Log In Here!</h1>
          <span className="text-red-700 text-sm">{error? error : null}</span>
            <div className="mb-4">
              <label htmlFor="email" className="font-normal block">Email</label>
              <input type="email" id="email" className="input p-1 rounded-lg shadow-lg" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="font-normal block">Password</label>
              <input type="password" id="password" className="input p-1 rounded-lg shadow-lg" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <div className="flex justify-center">
              <button className="btn-outline-dark" type="submit">Log In</button>
            </div>
            <p className="font-normal text-sm-center mt-4">Did not have an account yet?</p>
            <p className="font-normal text-blue-400 text-sm-center mt-4"><Link href={"/auth/register"}>Register Here</Link></p>
          </div>
      </form>
    </div>
  )
}

export default Login