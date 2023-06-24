'use client'
import { motion } from "framer-motion";
import axios from "axios";
import Head from "next/head";
import "../../globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Reviews from "@/app/components/Reviews";

export default function Page() {
  // const user_id =(typeof window !== "undefined" ? window.localStorage.getItem('user_id') : false)     
  const [service,setService] =useState({});
//  console.log(user_id)
  const router =useRouter()
  const {slug}= router.query;
  useEffect(() => {
    // Fetch user data from API
    fetch(`http://localhost:3000/service/${slug}`)
    .then((response)=>(response.json()) )
    .then((data)=>(setService(data)))
    .catch((err)=>(console.log(err)))
  
  
}, [slug]);


  if (!service) {
    return <div>Loading...</div>; // Display a loading state while fetching data
  }

  console.log(service)


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-purple-400 to-blue-500">
    <Head>
      <title>{service[0]?.title}</title>
    </Head>
  
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl px-8 py-12 bg-white rounded-lg shadow-lg space-y-4 hover:shadow-xl transition duration-300"
    >
      <div className="w-52">
        <img className="w-full h-auto object-contain mb-8 rounded-md shadow-lg" src={service[0]?.images} alt={service.title} />
      </div>
      <h2 className="text-3xl font-bold mb-4 font-serif">{service[0]?.title}</h2>
      <p className="text-xl text-gray-800">{service[0]?.description}</p>
      <p className="text-2xl font-bold text-gray-800">charges: ${service[0]?.charges}</p>
      <button onClick={()=>{router.push(`/request/${service[0]?.serviceprovider_id}`)}} className="bg-blue-500 hover:bg-blue-700  text-white font-semibold pt-2 pb-2 pr-4 pl-4 rounded">Message</button>
      <button onClick={()=>{router.push(`/locators`) } }className="bg-blue-500 ml-4 hover:bg-blue-700  text-white font-semibold pt-2 pb-2 pr-4 pl-4 rounded">Locate</button>
    <Reviews data={service[0]?.service_id}/>
    </motion.div>
  </div>
  
  
  );
};




