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

    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
   


    const mapContainerRef = useRef(null);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [36.8, -1.3],
          zoom: 10,
        });






    if (!map) return; // wait for map to initialize
    map.on('move', () => {
    setLng(map.getCenter().lng.toFixed(4));
    setLat(map.getCenter().lat.toFixed(4));
    setZoom(map.getZoom().toFixed(2));
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

        map.addControl(
          new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
          })
          );
      
    
        // Clean up on unmount
        return () => map.remove();
      }, []);
        


const markerClicked = (title) => {
    window.alert(title);
  };

  //geolocation control

 
  


  return (
    <div id='myactivity'>

    <Typography variant='h3' mb='46px'>
        My Activity
      </Typography>
     
    
   

    <div div className="map-container" ref={mapContainerRef} >
    <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    {/* <button className='geolocation'>My Location</button> */}

    </div>







    </div>
  )
}

export default MyActivity