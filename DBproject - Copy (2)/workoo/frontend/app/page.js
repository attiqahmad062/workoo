'use client'
import Image from 'next/image'
import '../globals.css'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Services from '@/pages/services';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const router =useRouter()
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token)
    {
      router.push('/login');
    }
   },[])
  return (
    <>
    <Services />
    </>
  )
}
