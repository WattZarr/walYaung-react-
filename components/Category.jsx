import {MdMenuBook} from 'react-icons/md'
import Glider from 'react-glider'
import "../node_modules/glider-js/glider.min.css"
import {FaRegLightbulb} from 'react-icons/fa'
import {GiLaptop,GiClothes,GiLipstick} from 'react-icons/gi'
import {AiOutlineCar} from 'react-icons/ai'
import {BiListUl} from 'react-icons/bi'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import {CgDarkMode} from 'react-icons/cg';

const Category = () => {

  const {dark} = useContext(UserContext);

  return (
    <div className='z-0'>
        <div className='flex items-center justify-between mb-4'>
        <h1 className="text-xl border-l-8 border-black flex items-center gap-3 mb-4">အမျိုးအစားများ <MdMenuBook></MdMenuBook> </h1>
        <button className='' onClick={dark}><CgDarkMode></CgDarkMode></button>
        </div>
        <div className='hidden md:grid grid-cols-3 gap-5'>
          <Link href={{pathname:"/filter",query:{id:"1"}}}>
            <div className='category-card'>
              <FaRegLightbulb></FaRegLightbulb>လျှပ်စစ်ပစ္စည်း
            </div>
          </Link>
          <Link href={{pathname:"/filter",query:{id:"2"}}}>
            <div className='category-card'>
              <GiLaptop></GiLaptop>အိမ်သုံးပစ္စည်း
            </div>
          </Link>
          <Link href={{pathname:"/filter",query:{id:"3"}}}>
            <div className='category-card'>
              <AiOutlineCar></AiOutlineCar>သွားလာရေး ယာဉ်
            </div>
          </Link>
          <Link href={{pathname:"/filter",query:{id:"4"}}}>
            <div className='category-card'>
              <GiClothes></GiClothes>အဝတ်အထည်
            </div>
          </Link>
          <Link href={{pathname:"/filter",query:{id:"5"}}}>
           <div className='category-card'>
              <GiLipstick></GiLipstick>Skin care ပစ္စည်း
            </div>
          </Link>
          <Link href={{pathname:"/filter",query:{id:"6"}}}>
            <div className='category-card'>
              <BiListUl></BiListUl>အခြား
            </div>
          </Link>
        </div>
        <div className='block md:hidden'>
          <Glider
          draggable
          slidesToShow={2}
          slidesToScroll={1}
        >

        
          <div className='category-card-mobile'>
          <Link href={{pathname:"/filter",query:{id:"1"}}}>
            <FaRegLightbulb></FaRegLightbulb> လျှပ်စစ်ပစ္စည်း
          </Link>
          </div>
        
        
          <div className='category-card-mobile'>
          <Link href={{pathname:"/filter",query:{id:"2"}}}>
            <GiLaptop></GiLaptop>အိမ်သုံးပစ္စည်း
          </Link>
          </div>
        
        
          <div className='category-card-mobile'>
          <Link href={{pathname:"/filter",query:{id:"3"}}}>
            <AiOutlineCar></AiOutlineCar>သွားလာရေး ယာဉ်
            </Link>
          </div>
        
        
          <div className='category-card-mobile'>
          <Link href={{pathname:"/filter",query:{id:"4"}}}>
            <GiClothes></GiClothes>အဝတ်အထည်
            </Link>
          </div>
        
        
          <div className='category-card-mobile'>
          <Link href={{pathname:"/filter",query:{id:"5"}}}>
            <GiLipstick></GiLipstick>Skin care ပစ္စည်း
            </Link>
          </div>
        
        
          <div className='category-card-mobile'>
          <Link href={{pathname:"/filter",query:{id:"6"}}}>
            <BiListUl></BiListUl>အခြား
            </Link>
          </div>
        
        </Glider>
      </div>
    </div>
  )
}

export default Category