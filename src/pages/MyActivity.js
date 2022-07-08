import React, {useRef, useEffect, useState} from 'react'
import ReactDOM from "react-dom";
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { GeolocateControl } from "react-map-gl";


import { Box, Stack, Typography } from '@mui/material'
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";



  const Marker = ({ onClick, children, feature }) => {
    const _onClick = () => {
      onClick(feature.properties.description);
    };
  
    return (
      <button onClick={_onClick} className="marker">
        {children}
      </button>
    );
  };



const MyActivity = () => {
   


    const mapContainerRef = useRef(null);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [36.8, -1.3],
          zoom: 10,
        });




        const geoJson = {
                        type: 'FeatureCollection',
                        features: [
                          {
                            type: 'Feature',
                            geometry: {
                              type: 'Point',
                              coordinates: [36.8, -1.3]
                            },
                            properties: {
                              title: 'Mapbox',
                              description: 'Washington, D.C.'
                            }
                          },
                          {
                            type: 'Feature',
                            geometry: {
                              type: 'Point',
                              coordinates: [36.85, -1.32]
                            },
                            properties: {
                              title: 'Mapbox',
                              description: 'San Francisco, California'
                            }
                          }
                        ]
                      };
    
        // // Render custom marker components
        geoJson.features.forEach((feature) => {
          // Create a React ref
          const ref = React.createRef();
          // Create a new DOM node and save it to the React ref
          ref.current = document.createElement("div");
          // Render a Marker Component on our new DOM node
          ReactDOM.render(
            <Marker onClick={markerClicked} feature={feature} />,
            ref.current
          );
    
          // Create a Mapbox Marker at our new DOM node
          new mapboxgl.Marker(ref.current)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
        });
    
        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
    
        // Clean up on unmount
        return () => map.remove();
      }, []);
        // const origin = [36.8, -1.3];

//        


//           // add markers to map
// for (const feature of geojson.features) {
//     // create a HTML element for each feature
//     const el = document.createElement('div');
//     el.className = 'marker';
//     console.log( map.current, 'map current ')
//     // make a marker for each feature and add to the map
//     // new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);
//   }

const markerClicked = (title) => {
    window.alert(title);
  };

  


  return (
    <div id='myactivity'>

    <Typography variant='h3' mb='46px'>
        My Activity
      </Typography>
     
    
   

    <div div className="map-container" ref={mapContainerRef} >
    {/* <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div> */}
    <button className='geolocation'>My Location</button>

    </div>







    </div>
  )
}

export default MyActivity