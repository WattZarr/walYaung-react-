import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router";
import { useRef } from "react"
import { toast } from "react-toastify";


const Register = () => {

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const cpwRef = useRef();
  const route = useRouter();

  const register = async (e) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_API+'api/register',{
      name:nameRef.current.value,
      phone:phoneRef.current.value,
      email:emailRef.current.value,
      pw:pwRef.current.value,
      cpw:cpwRef.current.value,
    }).then(res => {
      if(res.data.token == null){
        toast.error("There is error in registering.Please try again.")
      }
      else{
        const userData = JSON.stringify(res.data.user)
        const token =  res.data.token
        route.push({
          pathname:"/",
          query:{user:userData,token:token}
        },'user-data');
        toast.success("Register success")
      }
    })
    .catch(e => console.log(e))
  }

  return (
    <div className="mt-8">
        <h1 className="text-center text-2xl mb-8">Welcome to WalYaung</h1>
        <form action="" className="flex justify-center" onSubmit={register}>
            <div className="border-2 border-gray-500 rounded-lg px-10 py-5 md:px-24 py-10">
                <h1 className="font-normal text-center text-xl mb-4">Register Here!</h1>
                <div className="mb-4">
                <label htmlFor="name" className="font-normal block">Name</label>
                <input type="text" ref={nameRef} id="name" className="input p-1 rounded-lg shadow-lg" required/>
                </div>
                <div className="mb-4">
                <label htmlFor="phone" className="font-normal block">Phone</label>
                <input type="number" ref={phoneRef} id="phone" className="input p-1 rounded-lg shadow-lg" required/>
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="font-normal block">Email</label>
                <input type="email" ref={emailRef} id="email" className="input p-1 rounded-lg shadow-lg" required/>
                </div>
                <div className="mb-4">
                <label htmlFor="password" className="font-normal block">Password</label>
                <input type="password" ref={pwRef} id="password" className="input p-1 rounded-lg shadow-lg" minlength="8" required/>
                </div>
                <div className="mb-4">
                <label htmlFor="confirmPassword" className="font-normal block">Confirm Password</label>
                <input type="password" ref={cpwRef} id="confirmPassword" className="input p-1 rounded-lg shadow-lg" minlength="8" required/>
                </div>
                <div className="flex justify-center">
                <button className="btn-outline-dark" type="submit">Register</button>
                </div>
                <p className="font-normal text-sm-center mt-4">Already have an account?</p>
                <p className="font-normal text-blue-400 text-sm-center mt-4"><Link href={"/auth/login"}>Log in Here</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Register