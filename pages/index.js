import HomePage from '../pages/home'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home(getData) {
  const route = useRouter();
  const routeData = route.query;
  
  useEffect(()=>{
    if(Object.keys(routeData) != 0){
    getData.getData(routeData.user,routeData.token)
    }
  },[routeData])

  return (
    <HomePage></HomePage>
  );
}
