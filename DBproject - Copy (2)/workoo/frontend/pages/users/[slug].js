import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import "../../globals.css";
import { motion } from 'framer-motion';

export default function Page() {
  
const [user,setUser]= useState({}) 
const router = useRouter()
const {slug} =router.query;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from API
    if(slug){
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${slug}`);
        const data = await response.json();
        setUser(data); // Update the user state with the fetched data
        setIsLoading(false); // Set isLoading to false after the data is fetched
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  };
  
}, [slug]);
console.log(user)
if (isLoading) {
  return <div>Loading...</div>;
}

if (!user) {
  return <div>Error fetching user data.</div>;
}


  return( 
    
    <div className="flex items-center justify-center h-screen">
        {user &&
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 shadow-lg rounded-lg"
      >
      
        <img
          src={user[0].user_ProfilePic}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">{user[0].user_name}</h1>
        {/* <p className="text-gray-600">Web Developer</p> */}

      </motion.div>}
    </div>
  );
};
