import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import geojson from './countries.geo.json';
// import { getCountryShape } from './test.js';
import wc from 'which-country'

const bound1 = L.latLng(90, -180);
const bound2 = L.latLng(-90, 180);
const bounds = L.latLngBounds(bound1, bound2);
//--------------------------------------------
//possible URLs for the base TileLayer ------
//whichever we use, hit http://leaflet-extras.github.io/leaflet-providers/preview/index.html for the attribution.

//the one we started with: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

//gray, no borders (current layer as of this commit; can be brought in with a GeoJSON component)
//'https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png'
//associated GeoJSON:
// <GeoJSON
//   data={geojson.features}
//   style = {{ stroke: true, weight: 1, color: 'black', fill: false}} />
//-------------------------------------------
//--------------------------------------------


//setting a center of the map
const center = [51.505, -0.09];


class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      hovering: null
    }
  }

//gets the country that is being hovered over from the coordinates being hovered over and sets the state if it is a different country from the last.
handleHover = (e) => {
  const country = wc([e.latlng.lng, e.latlng.lat]);
  // console.log(country)

  if (this.state.hovering !== country) {
    this.setState({ hovering: country });
  }
}

  render() {
    return (
      <Map
        className="map"
        animate={true}
        onMouseMove={this.handleHover}
        zoom="2"
        center={center}
        maxBounds={bounds}
        zoomControl={true}
        style={{height:'80vh'}}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url='https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png'
        />

        <GeoJSON
          data={geojson.features}
          style={{stroke: true, weight: 1, color: 'black'}}
          />

        {geojson.features.map(feature => this.state.hovering === feature.properties.ISO_A3 && (
          <GeoJSON
            key={feature.properties.ISO_A3}
            data={feature}
            style={{stroke: false, fill: true, fillColor: 'firebrick', fillOpacity: 0.8}}
            >
              <Tooltip direction='bottom'>{feature.properties.ADMIN}</Tooltip>
            </GeoJSON>
        ))}
      </Map>
    )
  }
}

export default WorldMap;
