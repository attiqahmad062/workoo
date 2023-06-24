import "../globals.css"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/app/components/Navbar";
const ServiceRegistration = () => {
  const [formValues, setFormValues] = useState({
    serviceProviderId: '',
    charges: '',
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (event) => {
   
      const { name, value } = event.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    
  
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      image: file,}));
  };
  const handleSubmit = async (event) => {
    console.log(formValues.image)
    event.preventDefault();

    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('serviceProviderId', user_id);
    formData.append('charges', formValues.charges);
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('Service_Pic', formValues.image);

    try {
      const response = await fetch('http://localhost:3000/service/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Registration successful
        toast("Registration successful")
        // Redirect or show success message
      } else {
        toast("Registration failed")
        // Registration failed
        // Handle error
      }
    } catch (error) {
      console.error('Error registering service provider:', error);
    }
  };

  return (
    <>
      <ToastContainer />
    <Navbar/>
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Service  Registration</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
       
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="charges">
              Charges
            </label>
            <input
              type="text"
              id="charges"
              name="charges"
              value={formValues.charges}
              onChange={handleChange}
              className="w-full p-2 border-gray-300 border rounded"
              placeholder="Enter Charges"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full p-2 border-gray-300 border rounded"
              placeholder="Enter Title"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="w-full p-2 border-gray-300 border rounded"
              placeholder="Enter Description"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="Service_Pic"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </motion.div>
    </div>
    </>
  );
};

export default ServiceRegistration;
