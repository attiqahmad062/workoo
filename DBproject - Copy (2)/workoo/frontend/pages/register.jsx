import React, { useEffect, useState } from 'react';
import '../globals.css'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function RegisterPage() {
   
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
         
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)

          
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  
  useEffect(() => {
    getUserLocation();
  }, []);


  const router=useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  // const handleLocationChange = (event) => {
  //   setLocation(event.target.value);
  // };
   
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('ProfilePic', profilePic);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        body: formData,
      });
     
      if (response.ok) {
        console.log('Registration successful!');
        toast("Registered")
        router.push('/')
      } else {
        console.error('Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer/>
      <div className="max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="nameInput" className="block mb-2 text-gray-800">
              Name:
            </label>
            <input
              type="text"
              id="nameInput"
              value={name}
              onChange={handleNameChange}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailInput" className="block mb-2 text-gray-800">
              Email:
            </label>
            <input
              type="email"
              id="emailInput"
              value={email}
              onChange={handleEmailChange}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passwordInput" className="block mb-2 text-gray-800">
              Password:
            </label>
            <input
              type="password"
              id="passwordInput"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePicInput" className="block mb-2 text-gray-800">
              Profile Picture:
            </label>
            <input
              type="file"
              id="profilePicInput"
              name="ProfilePic"
              onChange={handleProfilePicChange}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="locationInput" className="block mb-2 text-gray-800">
              Location:
            </label>
            <input
              type="text"
              id="locationInput"
              value={location}
              onChange={handleLocationChange}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
