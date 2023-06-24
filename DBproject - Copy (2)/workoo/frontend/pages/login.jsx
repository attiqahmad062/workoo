"use client";
import '../globals.css'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginSignupPage = () => {
 
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  
   
   useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token)
    {
      router.push('/');
    }
   },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:3000/users/login";
    const requestData = {
      email: email,
      password: password,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.token) {
          toast("login succesfull")
          localStorage.setItem("token", data.token); // Store the token in localStorage
          localStorage.setItem("user_id", data.user_id); // Store the token in localStorage
          
          router.push('/');
          setIsLogin(true);
        }
        else {
          toast("wrong id or password")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
       
      });
      
      
    // Clear form fields
    // setEmail("");
    // setPassword("");
  };
  
  return (
    
    <div className="flex flex-col p-10 rounded-md  items-center justify-center min-h-screen bg-gray-100">
     <ToastContainer /> 
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">
            {isLogin ? "Log in" : "Sign up"}
          </h2>
        
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          
            
          </div>
        </form>
        <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              onClick={() =>{ 
                // setIsLogin(!isLogin);
                router.push('/register')
              }
              } 

            >
              SignUp instead
            </button>
      </div>
    </div>
  );
};

export default LoginSignupPage;
