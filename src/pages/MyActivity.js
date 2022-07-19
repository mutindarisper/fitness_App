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
          center: [ -2.127758, 41.507351 ], //36.8, -1.3
          zoom: 10,
        });






    if (!map) return; // wait for map to initialize
    map.on('move', () => {
    setLng(map.getCenter().lng.toFixed(4));
    setLat(map.getCenter().lat.toFixed(4));
    setZoom(map.getZoom().toFixed(2));
    });
 
     

// console.log(window.position, 'accessible position')


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

        // map.addControl(
          var geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
          })
          // );
          //add control to the map
          map.addControl(geolocate);

          //store the user's updates locations in an array
          var coordinates = [];
          // console.log(coordinates, 'SAME COORDINATES?')
      

          // retrieve the user's location
          function locateUser(e) {
            // console.log('A geolocate event has occurred.');
            // console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude)
            coordinates.push([e.coords.longitude, e.coords.latitude]) //update the empty array with the current location of the user as it changes
            //see if the array is updated
            console.log(coordinates, 'Updated COORDINATES?')
            window.localStorage.setItem("coordinates_", coordinates)
           
            //store the coordinates in local storage
            window.localStorage.setItem("coordinates", JSON.stringify(coordinates)) //we are converting the coordinates (which are arrays) to strings since they are compatible with local storage
          

          //  var updated_coordinates = JSON.stringify(window.localStorage.getItem("coordinates"))
          //  console.log(updated_coordinates, 'updated coordinates')
            // console.log(JSON.stringify(window.localStorage.getItem("coordinates")), 'strings')
            
              geolocate.off('geolocate', null);
              // return coor

          }

          geolocate.on('geolocate', locateUser);

          var updates = window.localStorage.getItem("coordinates")
          console.log(updates, 'updates')
          var str = JSON.parse(window.localStorage.getItem("coordinates"))
          console.log(str, ' str updated')

          var test_coords = JSON.parse(window.localStorage.getItem("coordinates_"))
          console.log(test_coords, ' test coords updated')

          //now draw the route using the user's location stored in the coordinates array

              //pilot first

          map.on('load', () => {
            // console.log(updates, 'updates outside')
            // console.log(str, ' str outside')

          
            
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates':str
                    }
                }
            });
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'red',
                    'line-width': 20
                }
            });
        });
          
    
        // Clean up on unmount
        return () => map.remove();
      }, []);
        


const markerClicked = (title) => {
    window.alert(title);
  };

  //geolocation control customized
const start = document.getElementById('geolocation')


const getUserLocation  = () => {
  navigator.geolocation.watchPosition(
    data => {
      console.log(data, 'success');
      window.longitude = data['coords']['latitude']
      window.latitude = data['coords']['longitude']
      window.position = [window.latitude, window.longitude]
      console.log( window.position, 'global position')

      var coordinates = Object.values( window.position)
      console.log(coordinates, 'coordinate values')

      // new mapboxgl.Marker()
      //       .setLngLat(data.coords.longitude, data.coords.latitude)
      //       .addTo(this.map);

    },
    error => {
      console.log(error);
    });
};

//  const getUserLocation1 =  navigator.geolocation.getCurrentPosition(
//     data => {
//       console.log(data);

//     },
//     error => {
//       console.log(error);
//     }); //if the browser is able to get current location then drop the pin


 
  


  return (
    <div id='myactivity'>

    <Typography variant='h3' mb='46px'>
        My Activity
      </Typography>
     
    
   

    <div div className="map-container" ref={mapContainerRef} >
    <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <button onClick={getUserLocation} id='geolocation' className='geolocation' style={{width: '50px', height: '20px' }}>Start</button>

    </div>







    </div>
  )
}

export default MyActivity