
import dynamic from 'next/dynamic';
import React from 'react'
// import MapboxMail from "../app/components/MapboxMail"
const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });
import '../globals.css'
const locators = () => {
  return (

    <div>
  {/* <MapboxMail /> */}
  
        <Map />
    </div>
  )
}

export default locators;