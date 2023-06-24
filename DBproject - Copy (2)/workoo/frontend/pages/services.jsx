// pages/services.js
'use client'
import React, { useEffect, useState } from 'react';
import '../globals.css'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';


const Services = () => {
  const router=useRouter();
  const [services, setServices] = useState([]);
  useEffect(()=>{
    const apiUrl = "http://localhost:3000/service";
   
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.warn("Response:", data);
        setServices(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast(error);
      });
  },[])
 console.log(services)
 
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8">Services</h1>
    
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search services..."
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {filteredServices.map((service) => (
     <Link href={`service/${service.service_id}` }
          key={service.service_id}
          className="bg-white shadow-lg rounded-md p-6"
        >
          <img src={service.images} alt="No Image" />
          <h2 className="text-xl font-bold mb-4">{service.title}</h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <p className="text-gray-500">User: {service.provider_name}</p>
        </Link>
      ))}
    </div>
  </div>
  </>
  );
};

// Remaining code for fetching services...

export default Services;
