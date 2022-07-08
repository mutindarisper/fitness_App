import React, {useRef, useEffect, useState} from 'react'
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


import { Box, Stack, Typography } from '@mui/material'




const MyActivity = () => {


    const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(36.8);
const [lat, setLat] = useState(-1.3);
const [zoom, setZoom] = useState(14);


useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og',
    center: [lng, lat],
    zoom: zoom
    });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
        });

    // const Map = ReactMapboxGl({
    //     accessToken:
    //       'pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og',
    //     //   center: [0.02, 37.8582273],
    //   });

    //   const Map = new mapboxgl.Map({
    //     container: 'myactivity',
    //     accessToken:
    //       'pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og',
    //     style: 'mapbox://styles/mapbox/dark-v10',
    //     center: [-1.2, 37.8],
    //     zoom: 3,
    //     // pitch: 40,
    //     // projection: 'globe',
        
    //     });


  return (
    <div id='myactivity'>

    <Typography variant='h3' mb='46px'>
        My Activity
      </Typography>


        {/* <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
            height: '50vh',
            width: '70vw',
      
        }}
        >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[37.8582273, 0.02]} />
        </Layer>
        </Map> */}



<div ref={mapContainer} className="map-container" />


    </div>
  )
}

export default MyActivity