import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

const center = [51.505, -0.09];

const bound1 = L.latLng(90, -180);
const bound2 = L.latLng(-90, 180);

const bounds = L.latLngBounds(bound1, bound2);

class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = { components: undefined }
  }

  componentDidMount() {
    let {
      Map: LeafletMap,
      TileLayer,
      GeoJSON
    } = require('react-leaflet');

    this.setState({
      components: {
        LeafletMap, TileLayer, GeoJSON
      }
    })
  }


  render() {
    if (!this.state.components) {
      return(
        <h1>Working on it</h1>
      )
    }
    const {
      LeafletMap,
      TileLayer,
      GeoJSON
    } = this.state.components;

    return (

    <LeafletMap
    className="map"
    zoom="3"
    center={center}
    zoomControl={true}
    >
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </LeafletMap>
    )
  }
}

export default WorldMap;
