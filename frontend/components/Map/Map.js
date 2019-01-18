import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import geojson from './countries.geo.json';
import wc from 'which-country'
import { fixData, getFeature } from './mapHelpers';
import { colors, defaultStyle, hoverStyle, colorStyle, borderStyle } from './countryStyles'
import { mapColorVisits, friendVisitData } from './dummyData';

//setting a center of the map
const center = [0, 0];

//sets the bounds for the map - where it stops.
const bound1 = L.latLng(85, -170);
const bound2 = L.latLng(-85, 175);
const bounds = L.latLngBounds(bound1, bound2);

//making the multi-user visit array easier to use



class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: null,
      borders: null,
      colors: null,
    }
  }

  componentDidMount() {
    const borderColors = fixData(this.props.visitsFriends.friends);
    this.setState({
      borders: borderColors,
      colors: this.props.visitsUser.user.visits,
    })
  }

//gets the country from the coordinates under the mouse and sets the state if it is a different country from the last.
handleHover = (e) => {
  const country = wc([e.latlng.lng, e.latlng.lat]);

  if (this.state.hovering !== country) {
    this.setState({ hovering: country });
  }
}

  render() {
    if (!this.state.colors || !this.state.borders) {
      return (
        <h1>I'm trying </h1>
      )
    }
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
        style={{height:'100vh', background: '#38B1BF'}}
        maxBoundsViscosity='1'
      >
        <GeoJSON
          data={geojson.features}
          style={defaultStyle}
          />

        {geojson.features.map(feature => this.state.hovering === feature.properties.ISO_A3 && (
          <GeoJSON
            key={feature.properties.ISO_A3}
            data={feature}
            style={hoverStyle}
            />
        ))}

        {this.state.colors.map(visit => {
          const {country, level } = visit;
          let style = {
            ...colorStyle,
            fillColor: colors[level]
          };

          const feature = getFeature(geojson, country.code)

          return (<GeoJSON key={country.code} data={feature} style={style}/>)
          }
        )}

        {this.state.borders.map(visit => {
          const {country, level} = visit;

          let style = {
            ...borderStyle,
            color: colors[level]
          }

          const feature = getFeature(geojson, country.code);

          return (<GeoJSON key={visit.id} data={feature} style={style}/>)
          }
        )}

      </Map>
    )
  }
}

export default WorldMap;
