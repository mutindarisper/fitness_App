import React, {useRef, useEffect, useState} from 'react'
import ReactDOM from "react-dom";
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { GeolocateControl } from "react-map-gl";
import MapboxDirections from '@nico29/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@nico29/mapbox-gl-directions/dist/mapbox-gl-directions.css'
// import waffle from '../assets/fonts/waffle_story/Waffle Story.otf'
// // eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


import { Box, Stack, Typography } from '@mui/material'
import Walk from '../assets/images/walk.png'
import Run from '../assets/images/run.png'
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
          center: [36.8, -1.3 ], //36.8, -1.3
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

//directions 

          

var directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'metric',
  profile: 'mapbox/walking',
  controls: {
    inputs: false,
    instructions: false,
    profileSwitcher: false
  },
  // coordinates: [[36.8,-1.34],[36.8,-1.34],[36.8,-1.31],[36.8,-1.31],[36.8,-1.36],[36.8,-1.36],[36.8,-1.36]]
});

map.addControl(directions, 'top-right');

          //store the user's updates locations in an array
          var coordinates = [];
          // console.log(coordinates, 'SAME COORDINATES?')
      
            var current_position = []

            var user_location = []
          // retrieve the user's location
          function locateUser(e) {

            user_location = [e.coords.longitude, e.coords.latitude]
             console.log(user_location, 'user geolocation')
             window.localStorage.setItem("user_location", user_location)
            
          
            current_position.push([e.coords.longitude, e.coords.latitude])
            // console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude)
            coordinates.push([e.coords.longitude, e.coords.latitude]) //update the empty array with the current location of the user as it changes
            //see if the array is updated
            console.log(coordinates, 'Updated COORDINATES?')
            window.localStorage.setItem("coordinates", coordinates)
           
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
          

          // var test_coords = JSON.parse(window.localStorage.getItem("coordinates_"))
          // console.log(test_coords, ' test coords updated')

          //now draw the route using the user's location stored in the coordinates array

              //pilot first

          map.on('load',  (e) => {
            // locateUser();
            // directions.setOrigin(current_position);
            // directions.setDestinaion([e.coords.longitude, e.coords.latitude]);
        
              // map.remove();
              // clearRouteLine();

              if (first_element && last_element!==null) {
                directions.setOrigin(); // can be address in form setOrigin("12, Elm Street, NY") [36.83,-1.32]
                directions.setDestination();
              
               
            }
         
              
            var str = JSON.parse(window.localStorage.getItem("coordinates"))
          console.log(str, ' str updated')
          
          var first_element = str[0]
          console.log(first_element, 'first element')
          window.localStorage.setItem("first_element", first_element)

          var element1 = window.localStorage.getItem("first_element")
          console.log(element1, 'element 1')

          var last_element = str[str.length - 1];
          console.log(last_element, 'last element')
          window.localStorage.setItem("last_element", last_element)

          var element2 = window.localStorage.getItem("last_element")
          console.log(element2, 'element 2')
            // console.log(str, 'current position')
            directions.setOrigin(first_element); // can be address in form setOrigin("12, Elm Street, NY") [36.83,-1.32]
            directions.setDestination(last_element); // can be address
           
          
            // map.addSource('route', {
            //     'type': 'geojson',
            //     'data': {
            //         'type': 'Feature',
            //         'properties': {},
            //         'geometry': {
            //             'type': 'LineString',
            //             'coordinates': coordinates
            //         }
            //     }
            // });
            // map.addLayer({
            //     'id': 'route',
            //     'type': 'line',
            //     'source': 'route',
            //     'layout': {
            //         'line-join': 'round',
            //         'line-cap': 'round'
            //     },
            //     'paint': {
            //         'line-color': 'red',
            //         'line-width': 5
            //     }
            // });
           
            

            
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

const reload = () => {
  document.location.reload();
}

 
  


  return (
    <div id='myactivity'>

    <Typography variant='h3' mb='46px'>
        My Activity
      </Typography>
     
    
   

    <div div className="map-container" ref={mapContainerRef} >
    <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <button onClick={reload} id='geolocation' className='geolocation'
     style={{width: '150px', 
     height: '50px',
      top:'40vh', 
      left:'63vw', 
      borderRadius: '5px', 
      border:'none',
      backgroundColor:'#fff' }}
     >
      <span className='activity'>My activity</span>
     
     <img src={Run}
     className='run'
     style={{}}/></button>

    </div>







    </div>
  )
}

export default MyActivity