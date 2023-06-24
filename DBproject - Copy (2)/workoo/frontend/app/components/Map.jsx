import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import '../../globals.css'
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css'; 
const Map = () => {
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
      }
     const user1Location =[33.9091, 72.4921];
      const user2Location = [33.995984, 72.936762];
    //   const [distance, setDistance] = useState(0);
  //     useEffect(()=>{
  //       setUser1Location(); 
  // setUser2Location(); 
  //     },[])
 

const distance =calculateDistance(user1Location[0], user1Location[1], user2Location[0], user2Location[1]); // Replace with your distance calculation function

  return (
    <div >
      {user1Location && user2Location && (
        <MapContainer center={user2Location} zoom={12} scrollWheelZoom={false} style={{ height: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={user1Location} />
          <Marker position={user2Location} />
          <Polyline positions={[user1Location,user2Location]} />
        </MapContainer>
      )}
      <div>{`Distance: ${distance} km`}</div>
      {!user1Location && !user2Location && <div>Loading...</div>}
    </div>
  );
};


export default Map;