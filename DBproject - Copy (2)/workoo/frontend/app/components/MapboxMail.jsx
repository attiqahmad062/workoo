// // import React, { useState, useEffect } from 'react';
// // import ReactMapGL, { Marker } from 'react-map-gl';
// // import 'mapbox-gl/dist/mapbox-gl.css';
// // const MapboxMap = () => {
// //   const [viewport, setViewport] = useState({
// //     width: '100%',
// //     height: 400,
// //     latitude:33.9091,
// //     longitude: 72.4921,
// //     zoom: 12,
// //   });

// //   console.log("whats the isssue ")
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setViewport((prevViewport) => ({
// //         ...prevViewport,
// //         width: '100%',
// //         height: 400,
// //       }));
// //     };

// //     window.addEventListener('resize', handleResize);

// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //     };
// //   }, []);
// //   // [33.9091,72.4921]
// //   return (
// //     <ReactMapGL
// //       {...viewport}
// //       mapboxAccessToken="pk.eyJ1IjoiYXR0aXFhaG1hZDc3IiwiYSI6ImNsaXo0M3h2YTAycjUzY25vcTBuZWZhMGcifQ.Edthl8Opw9ypcRU90agXLg"
// //       onViewportChange={(newViewport) => setViewport(newViewport)}
// //     >
// //       <Marker latitude={33.9091} longitude={72.4921}>
// //         <div>Marker</div>
// //       </Marker>
// //     </ReactMapGL>
// //   );
// // };

// // export default MapboxMap;

// import "mapbox-gl/dist/mapbox-gl.css";
// import Geocoder from '@mapbox/mapbox-gl-geocoder';
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import { useEffect, useRef, useState } from "react";
// import Map from "react-map-gl";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
// // import Geocoder from "react-map-gl-geocoder";

// const token = "pk.eyJ1IjoiYXR0aXFhaG1hZDc3IiwiYSI6ImNsaXo0OHAyMTA4ODYzcm9kZXVlOHowNG8ifQ.XmN2P2kf3b7922iW26XW9w";

// const MapboxMap = () => {
//   const [viewport, setViewPort] = useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 1,
//     transitionDuration: 100,
//   });
//   const [searchResultLayer, setSearchResult] = useState(null);
//   const mapRef = useRef();
//   const handleOnResult = (event) => {
//     console.log(event.result);
//     setSearchResult(
//       new GeoJsonLayer({
//         id: "search-result",
//         data: event.result.geometry,
//         getFillColor: [255, 0, 0, 128],
//         getRadius: 1000,
//         pointRadiusMinPixels: 10,
//         pointRadiusMaxPixels: 10,
//       })
//     );
//   };
//   const handleGeocoderViewportChange = (viewport) => {
//     const geocoderDefaultOverrides = { transitionDuration: 1000 };
//     console.log("Updating");
//     return setViewPort({
//       ...viewport,
//       ...geocoderDefaultOverrides,
//     });
//   };
//   useEffect(() => {
//     console.log({ viewport });
//   }, [viewport]);
//   return (
//     <div>
//       <h1>Use the search bar to find a location on the map</h1>
//       <Map
//         ref={mapRef}
//         {...viewport}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//         width="100%"
//         height="70vh"
//         onViewportChange={setViewPort}
//         mapboxAccessToken={token}
//       >
//         <Geocoder
//           mapRef={mapRef}
//           onResult={handleOnResult}
//           onViewportChange={handleGeocoderViewportChange}
//           mapboxAccessToken={token}
//           position="top-left"
//         />
//       </Map>
//       <DeckGL {...viewport} layers={[searchResultLayer]} />
//     </div>
//   );
// };
// export default MapboxMap;

import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapboxMap() {
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        width: "100",
        height: "400",
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5,
      });
    });
  }, []);
  return (
    <div>
      {viewport.latitude && viewport.longitude && (
        <div>
          <h1>Your Location:</h1>
          <Map
            mapboxAccessToken="pk.eyJ1IjoiYXR0aXFhaG1hZDc3IiwiYSI6ImNsaXo0OHAyMTA4ODYzcm9kZXVlOHowNG8ifQ.XmN2P2kf3b7922iW26XW9w"
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
            />
          </Map>
        </div>
      )}
    </div>
  );
}
export default MapboxMap;