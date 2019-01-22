import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { Label } from 'semantic-ui-react';
import geojson from './countries.geo.json';
import whichPolygon from 'which-polygon';
import { getFeature } from './mapHelpers';
import { colors, defaultStyle, hoverStyle, colorStyle, borderStyle } from './countryStyles'

//// TODO: Update render logic to accomodate switching the data displayed (logic currently only expects default user view of map; needs to be updated for if a friend's map is being displayed.)

//// TODO: Look at reducing GeoJSON renders either by reducing the number of renders, or be using something like geojson-vt. There are currently four layers of GeoJSON - a base layer of all polygons, a layer that is the hovered polygon and associated label, a layer that is the colors of the countries to reflect user visits, and a layer that is the color of the borders to reflect friend visits.


//setting a center of the map
const center = [0, 0];

//sets the bounds for the map - where it stops.
const bound1 = L.latLng(85, -170);
const bound2 = L.latLng(-85, 175);
const bounds = L.latLngBounds(bound1, bound2);


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
    //this logic needs to be updated for if the local store viewingFriend is false.
    this.setState({
      borders: this.props.borders,
      colors: this.props.colors,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.colors != this.props.colors) {
      console.log('it changed!', prevProps.colors, this.props.colors)
      // this.setState({
      //   colors: this.props.colors,
      //   borders: this.props.borders
      // })
      this.forceUpdate();
    }
  }

  handleHover = (e) => {
    //gets the country for the coordinates under the mouse
    let query = whichPolygon(geojson);
    const country = query([e.latlng.lng, e.latlng.lat]);
    //gets the position of the mouse on the screen and sets it to an object with an offset (to be passed to the country label/popup for positioning. )
    const popupY = e.originalEvent.clientY - 50;
    const popupX = e.originalEvent.clientX - 30;
    const mouse = {
      x: popupX + 'px',
      y: popupY + 'px'
    }
  //if there is no country under the mouse, set state to null so that no country is highlighted and no label/popup is displayed.
    if (!country && this.state.hovering){
      this.setState({
        hovering: null,
        mouse: null,
      })
    }
  //if there is a country under the mouse and it is not the same as the previous country being hovered over, set the state to reflect the new country and the new position for the popup/label
    if (country && this.state.hovering !== country.ADMIN) {
      this.setState({ hovering: country.ADMIN, mouse: mouse });
    }
  }

  render() {
    //test logic for if either of these is false
    if (!this.props.colors || !this.props.borders) {
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

        {this.props.colors.map(visit => {
          const level = visit[3];
          let style = {
            ...colorStyle,
            color: colors[level],
            fillColor: colors[level]
          };

          const feature = getFeature(geojson, visit[2])

          return (<GeoJSON key={visit[0]} data={feature} style={style}/>)
          }
        )}

        {this.state.showBorders && this.props.borders.map(visit => {
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
