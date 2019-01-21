import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { Label } from 'semantic-ui-react';
import geojson from './countries.geo.json';
import whichPolygon from 'which-polygon';
import { getFeature } from './mapHelpers';
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
      showBorders: false,
      hovering: null,
      mouse: null,
      borders: [],
      colors: [],
    }
  }

  componentDidMount() {
    this.setState({
      borders: this.props.visitsFriends,
      colors: this.props.visitsUser,
    })
  }


//gets the country from the coordinates under the mouse and sets the state if it is a different country from the last.
handleHover = (e) => {
  let query = whichPolygon(geojson);
  const country = query([e.latlng.lng, e.latlng.lat]);
  const popupY = e.originalEvent.clientY - 50;
  const popupX = e.originalEvent.clientX - 30;
  const mouse = {
    x: popupX + 'px',
    y: popupY + 'px'
  }

  if (!country && this.state.hovering){
    this.setState({
      hovering: null,
      mouse: null,
    })
  }
  if (country && this.state.hovering !== country.ADMIN) {
    this.setState({ hovering: country.ADMIN, mouse: mouse });
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

        {geojson.features.map(feature => this.state.hovering === feature.properties.ADMIN && (
          <Label
          key={feature.properties.ADMIN}
          style={{position: 'absolute', left: this.state.mouse.x, top: this.state.mouse.y, zIndex: 10000}}>
            <GeoJSON
              data={feature}
              style={hoverStyle}
              />
              {this.state.hovering}
            </Label>
        ))}

        {this.state.colors.map(visit => {
          const { country, level} = visit;
          let style = {
            ...colorStyle,
            color: colors[level],
            fillColor: colors[level]
          };

          const feature = getFeature(geojson, country.name)

          return (<GeoJSON key={country.id} data={feature} style={style}/>)
          }
        )}

        {this.state.showBorders && this.state.borders.map(visit => {
          const level = visit[3];

          let style = {
            ...borderStyle,
            color: colors[level]
          }

          const feature = getFeature(geojson, visit[2]);

          return (<GeoJSON key={visit[0]} data={feature} style={style}/>)
          }
        )}

      </Map>
    )
  }
}

export default WorldMap;
