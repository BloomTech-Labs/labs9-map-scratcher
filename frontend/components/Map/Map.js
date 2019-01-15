import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import geojson from './countries.geo.json';
import { getCountryShape } from './test.js'

const bound1 = L.latLng(90, -180);
const bound2 = L.latLng(-90, 180);
const bounds = L.latLngBounds(bound1, bound2);

//setting a center of the map
const center = [51.505, -0.09];

class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      hovering: null
    }
  }

// //this was a previous way of circumventing the fact that react-leaflet does not support SSR. It did not work on its own.
//   componentDidMount() {
//     let {
//       Map: LeafletMap,
//       TileLayer,
//       GeoJSON
//     } = require('react-leaflet');
//
//     this.setState({
//       components: {
//         LeafletMap, TileLayer, GeoJSON
//       }
//     })
//   }
//
//   componentDidUpdate (prevState) {
//
//     //bounds setting the edges of the map
//     const bound1 = L.latLng(90, -180);
//     const bound2 = L.latLng(-90, 180);
//
//     const bounds = L.latLngBounds(bound1, bound2);
//     if (this.Map) {
//       this.Map.leafletElement.fitBounds(bounds);
//     }
//   }

  render() {

    // //this is in conjunction with the componentDidMount and componentDidUpdate workaround above
    // if (!this.state.components) {
    //   return(
    //     <h1>Working on it</h1>
    //   )
    // }
    // const {
    //   LeafletMap,
    //   TileLayer,
    //   GeoJSON
    // } = this.state.components;

    return (
    //if attempting the commented out portion Map should be LeafletMap and no need to set the maxBounds here (it is set in a lifecycle method above)
      <Map
      className="map"
      zoom="3"
      center={center}
      maxBounds={bounds}
      zoomControl={true}
      >
      <div style={{height:'100vh'}}></div>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {geojson.features.map(feature => this.state.hovering === feature.id && (
        <GeoJSON
          key={feature.id}
          data={getCountryShape(feature.id)}
          style={fillColor:'yellow'}
          />
      ))}
      </Map>
    )
  }
}

export default WorldMap;
