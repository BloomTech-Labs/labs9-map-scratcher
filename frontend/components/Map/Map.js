import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import geojson from './countries.geo.json';
// import { getCountryShape } from './test.js';
import wc from 'which-country'

const bound1 = L.latLng(85, -170);
const bound2 = L.latLng(-85, 175);
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

//Carto voyager
// 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

// //turns out we don't actually need a tile layer at all but in case
// <TileLayer
//   attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//   url='https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png'
// />
//-------------------------------------------
//--------------------------------------------


//setting a center of the map
// const center = [51.505, -0.09];
const center = [0, 0];


class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      hovering: null,
      userVisits: [{
            "country": {
              "name": "Antarctica",
              "code": "ATA"
            },
            "level": 3
          },
          {
            "country": {
              "name": "Australia",
              "code": "AUS"
            },
            "level": 1
          }],
      friendVisits: [{
            "country": {
              "name": "Australia",
              "code": "AUS"
            },
            "level": 2
          },
          {
            "country": {
              "name": "France",
              "code": "FRA"
            },
            "level": 4
          }],
    }
  }

//gets the country that is being hovered over from the coordinates being hovered over and sets the state if it is a different country from the last.
handleHover = (e) => {
  const country = wc([e.latlng.lng, e.latlng.lat]);

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
        zoom='3'
        maxZoom='5'
        minZoom='2'
        center={center}
        maxBounds={bounds}
        zoomControl={true}
        style={{height:'100vh', background: 'teal'}}
        maxBoundsViscosity='1'
      >

        <GeoJSON
          data={geojson.features}
          style={{stroke: true, weight: 1, color: 'black', fill: true, fillColor: 'silver', fillOpacity: 1}}
          />

        {geojson.features.map(feature => this.state.hovering === feature.properties.ISO_A3 && (
          <GeoJSON
            key={feature.properties.ISO_A3}
            data={feature}
            style={{stroke: false, fill: true, fillColor: 'firebrick', fillOpacity: 0.8}}
            />
        ))}

        {this.state.userVisits && this.state.userVisits.map(visit => {
          let style = { stroke: false, fill: true }
          const feature = geojson.features.find(feature => feature.properties.ISO_A3 == visit.country.code)
          if (visit.level === 1) {
            style = {
              ...style,
              fillColor: 'pink'
            }
          }
          if (visit.level === 2) {
            style = {
              ...style,
              fillColor: 'yellow'
            }
          }
          if (visit.level === 3) {
            style = {
              ...style,
              fillColor: 'green'
            }
          }
          if (visit.level === 4) {
            style = {
              ...style,
              fillColor: 'blue'
            }
          }
          return (<GeoJSON key={visit.country.code} data={feature} style={style}/>)
          }
        )}

        {this.state.friendVisits && this.state.friendVisits.map(fvisit => {
          let style = { stroke: true, weight: 1, fill: false }
          const feature = geojson.features.find(feature => feature.properties.ISO_A3 == fvisit.country.code)
          console.log(feature)
          if (fvisit.level === 1) {
            style = {
              ...style,
              color: 'pink'
            }
          }
          if (fvisit.level === 2) {
            style = {
              ...style,
              color: 'yellow'
            }
          }
          if (fvisit.level === 3) {
            style = {
              ...style,
              color: 'green'
            }
          }
          if (fvisit.level === 4) {
            style = {
              ...style,
              color: 'blue'
            }
          }
          return (<GeoJSON key={fvisit.country.code} data={feature} style={style}/>)
          }
        )}

      </Map>
    )
  }
}

export default WorldMap;
