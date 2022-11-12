import {HiMenu} from 'react-icons/hi';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import {UserContext} from '../pages/UserContext'
import { useRouter } from 'next/router';


const Nav = () => {
  let {user,token,logout,search} = useContext(UserContext);
  const route = useRouter();

  const showNav = () => {
    const navList =  document.querySelector("#nav-item");
    navList.classList.toggle("nav-list");

  }


  return (
    <div className='sticky top-0 bg-gray-300 z-50' id="nav">
      <div className="flex justify-between items-center mb-4">
        <Link href={"/"}><h1 className="text-2xl">WalYaung</h1></Link>
        <ul className="hidden cursor-pointer md:flex gap-4 lg:gap-8 font-normal">
          <Link href={"/profile"}>
            <li>
                Profile
            </li>
          </Link>
          <Link href={"/items"}>
            <li>
                ပစ္စည်းစာရင်းများ
            </li>
          </Link>
          <Link href={"/sold-items"}>
            <li>
                ရောင်းချပြီးသောပစ္စည်းများ
            </li>
          </Link>
          <Link href={"/unsold-items"}>
            <li>
                မရောင်းရသေးသောပစ္စည်းများ
            </li>
          </Link>
          <Link href={"/sell-item"}>
            <li>
                ပစ္စည်းရောင်းရန်
            </li>
          </Link>
        </ul>
        <button className="block md:hidden text-xl btn btn-outline-dark" onClick={showNav}><HiMenu></HiMenu></button>
      </div>
      <ul className='bg-gray-300 cursor-pointer tr-1 mb-6 nav-list z-50 font-normal md:hidden' id="nav-item">
        <Link href={"/profile"}>
          <li className='mb-2'>
              Profile
          </li>
        </Link>
        <Link href={"/items"}>
          <li className='mb-2'>
              ပစ္စည်းစာရင်းများ
          </li>
        </Link>
        <Link href={"/sold-items"}>
          <li className='mb-2'>
              ရောင်းချပြီးသောပစ္စည်းများ
          </li>
        </Link>
        <Link href={"/unsold-items"}>
          <li className='mb-2'>
              မရောင်းရသေးသောပစ္စည်းများ
          </li>
        </Link>
        <Link href={"/sell-item"}>
          <li className='mb-2'>
              ပစ္စည်းရောင်းရန်
          </li>
        </Link>
        {!token &&(
            <>
          <Link href={"/auth/login"}>
          <li className='mb-2'>
              Log In
          </li>
        </Link>
        <Link href={"/auth/register"}>
          <li className='mb-2'>
              Register
          </li>
        </Link>
        </>
        )
        }
        {token &&(
        <>
          <li className='mb-2' onClick={logout}>
              Log Out
          </li>
        </>
        )}
        
      </ul>
      <div className="flex justify-start md:justify-end">
        <div className="flex md:gap-8 items-center">
          <input type="text" className="shadow-lg p-1 rounded-lg input" placeholder="Search Item" onChange={(e)=>search(e.target.value)}/>
          {!token &&(
          <>
            <Link href={"/auth/login"}><button className="hidden md:block btn btn-outline-dark ">Log In</button></Link>
            <Link href={"/auth/register"}><button className="hidden md:block btn btn-outline-dark">Register</button></Link>
          </>
          )}
          {token &&(
            <>
              <button className="hidden md:block btn-outline-dark" onClick={logout}>Log Out</button>
            </>
          )}

          </div>
      </div>
    </div>
  )
}

export default Nav