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

        console.log( mapContainer.current, 'mapcontainer')

        // const origin = [36.8, -1.3];

        const geojson = {
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
                  coordinates: [36.95, -1.39]
                },
                properties: {
                  title: 'Mapbox',
                  description: 'San Francisco, California'
                }
              }
            ]
          };


          // add markers to map
for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
    console.log( map.current, 'map current ')
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);
  }


  return (
    <div id='myactivity'>

    <Typography variant='h3' mb='46px'>
        My Activity
      </Typography>
      <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>

<div ref={mapContainer} className="map-container" />


    </div>
  )
}

export default MyActivity