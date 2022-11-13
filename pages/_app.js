import { useRouter } from 'next/router';
import { useState } from 'react';
import '../styles/globals.css'
import Layout from "./layout";
import { UserContext } from '../UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
  

function MyApp({ Component, pageProps }) {

  const [user,setUser] = useState({});
  const [token,setToken] = useState("");
  const route = useRouter();
  const [searchData,setSearchData] = useState("");

  const getData = (user,token) => {
    if(user) setUser(user);
    if(!user) setUser(null);
    setToken(token);
  }

  const logout = () => {
    setToken();
    setUser(null);
    route.push("/");
  }

  const search = async (data) => {
    setSearchData(data);
  }

  const dark = () => {
    document.querySelector('#root').classList.toggle('dark-mode')
    document.querySelector('#nav').classList.toggle('dark-mode')
    document.querySelectorAll('.item').forEach(i => {
      i.classList.toggle('dark-mode')
    })
    document.querySelector('#nav-item').classList.toggle('dark-mode')
    document.querySelectorAll(".btn").forEach(i => {
      if(i.classList.contains("btn-outline-dark")){
        i.classList.replace("btn-outline-dark","btn-outline-white")
      }
      else{
        i.classList.replace("btn-outline-white","btn-outline-dark")
      }
    })
  }

  return (
    <UserContext.Provider value={{user,token,searchData,logout,search,dark}}>
      <Layout>
        <ToastContainer></ToastContainer>
        <Component {...pageProps} getData={getData}/>
      </Layout>
    </UserContext.Provider>
  )
}

export default MyApp
