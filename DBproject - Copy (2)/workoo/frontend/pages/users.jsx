import React, { useEffect, useState } from "react";
import "../globals.css";
import { useRouter } from "next/navigation";
const serviceproviders = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        

        setUsers(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
    
  }, []);
  


  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = users.filter((service) =>
    service.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">ServiceProviders</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search providers..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" >
        {filteredUsers.map((service) => (
          <div
            key={service.user_id}
            className="bg-white shadow-lg rounded-md p-6"
            onClick={
              ()=>{
                router.push(`/users/${service.user_id}`)
              }
            }
          >
            {service.user_ProfilePic && (
              <img className=" flex items-center justify-center "
                src={service.user_ProfilePic}
                alt="no image"
              />
              
              )
            }
           

            <h2 className="text-xl font-bold mb-4">{service.user_name}</h2>
            <p className="text-gray-600 mb-4">{service.user_email}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default serviceproviders;
