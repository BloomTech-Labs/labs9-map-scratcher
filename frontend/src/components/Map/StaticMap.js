

//== Static Map Component ======================================================
/*
    This is the static map that displays the background map onto which the other
    countries are drawn from GeoJSON data. It accept the following props:
        asdf(string) - sdfal;kjasdfjlk
        JKL:(boolean) - asdflsadfj;
    TODO:
        Look at reducing GeoJSON renders either by reducing the number of
        renders, or be using something like geojson-vt. There are currently four
        layers of GeoJSON - a base layer of all polygons, a layer that is the
        hovered polygon and associated label, a layer that is the colors of the
        countries to reflect user visits, and a layer that is the color of the
        borders to reflect friend visits.
*/

//-- Dependencies --------------------------------
// Libraries
import React from 'react';
import L from 'leaflet';
import { Query, Mutation } from 'react-apollo';
import { Map, GeoJSON } from 'react-leaflet';
import { Label } from 'semantic-ui-react';
import whichPolygon from 'which-polygon';
// Modules I've defined
import geojson from './countries.geo.json';
import { getFeature } from './mapHelpers';
import {
  defaultStyle, hoverStyle, colorStyle, borderStyle
} from './countryStyles';
import {
  MUTATION_OPENMODAL_TRAVELS,
} from '../../services/requests/travels';
import {
  QUERY_COUNTRIES_HEADER
} from '../../services/requests/header';

//-- Project Constants ---------------------------
// setting a center of the map. Configurable.
const center = [0, 0];
// sets the bounds for the map - where it stops.
const bound1 = L.latLng(85, -170);
const bound2 = L.latLng(-85, 175);
const bounds = L.latLngBounds(bound1, bound2);


//== React Specific ============================================================

//-- Initialization and Definition -----------------

export default class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: null,
      mouse: null
    }
  }

  // shouldComponentUpdate(prevProps, nextState) {
  //   if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
  //     return true;
  //   }
  //   return true
  // }
  //-- When Receiving Props ------------------------
  componentDidUpdate(prevProps) {
    if (prevProps.colors !== this.props.colors) {
      this.geoKey = Math.random();
      this.forceUpdate();
    }
    if (prevProps.theme !== this.props.theme) {
      this.geoKey = Math.random();
      this.forceUpdate();
    }
  }


//== Interaction ===============================================================

  //-- Handle Hover ---------------------------------
  handleHover = (eventHover) => {
    //gets the country for the coordinates under the mouse
    let query = whichPolygon(geojson);
    const country = query([eventHover.latlng.lng, eventHover.latlng.lat]);
    // gets the position of the mouse on the screen and sets it to an object with an offset (to be passed to the country label/popup for positioning. )
    const popupY = eventHover.originalEvent.clientY - 50;
    const popupX = eventHover.originalEvent.clientX - 30;
    const mouse = {
      x: popupX + 'px',
      y: popupY + 'px'
    }
    // if there is no country under the mouse, set state to null so that no country is highlighted and no label/popup is displayed.
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


//== Rendering =================================================================

  //-- Final React Render --------------------------
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
        style={{height:'100vh', background: '#243352'}}
        maxBoundsViscosity='1'
      >
        <GeoJSON
          data={geojson.features}
          style={defaultStyle}
          />
        {this.props.colors && this.props.colors.map(visit => {
          //maps through the colors passed as props to the map to render the countries in the correct color.
          const level = visit[3];
          let style = {
            ...colorStyle,
            fillColor: this.props.theme[level]
          };
          const feature = getFeature(geojson, visit[2])
          return (
            <GeoJSON
            key={`${visit[0]}${this.geoKey}`}
            data={feature}
            style={style}
            />)
          }
        )}
        { (this.props.borders && this.props.viewBorders) &&
          this.props.borders.map(visit => {
            const level = visit[3];
            let style = {
              ...borderStyle,
              color: this.props.theme[level]
            }
            const feature = getFeature(geojson, visit[2]);
            return (<GeoJSON
              key={`${visit[0]}${this.geoKey}`}
              data={feature}
              style={style}
            />)
          })
        }
        {geojson.features.map(feature => this.state.hovering === feature.properties.ADMIN && (
          <Query key={feature.properties.ADMIN} query={QUERY_COUNTRIES_HEADER}>
          {({ loading, data: { countries }}) => {
            if (loading) {
              return null;
            }
            let country = {};
            if (countries) {
              country = countries.filter(country => {
                return country.name === feature.properties.ADMIN;
              })
            }
            return (
              <Mutation mutation={MUTATION_OPENMODAL_TRAVELS} >
              {(openModal, { data }) => (
                  <Label
                  style={{position: 'absolute', left: this.state.mouse.x, top: this.state.mouse.y, zIndex: 400}}>
                    <GeoJSON
                      onClick={(e) => {
                        openModal({ variables: {id: country[0].id}})
                      }}
                      data={feature}
                      style={hoverStyle}
                    />
                    {this.state.hovering}
                    </Label>
              )}
              </Mutation>
            );
          }}
            </Query>
        ))}
      </Map>
    )
  }
}
