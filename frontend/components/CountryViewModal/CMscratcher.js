import React from 'react'
import Scatcher from '../Scratcher/index.js'

export default class CMscratcher extends React.Component {


    render() {
        return (
        <div style={{height: '200px'}}>
          {/* scratchable: nested ternary if user prop === self, then check automated settings */}
            <Scatcher 
              scratchable={true}
              urlMap={`/static/country-alpha/usa.svg`} 
              urlFlag={`/static/country-flag/usa.svg`} 
              colorOutline={'cyan'} 
              colorScratch={'silver'} 
              handleScratchAll={() => console.log('working')} 
              handleLoadingError={() => console.log('cannot load image')} 
              style={{ height: '200px' }} />
        </div>
        )
    }
}


// props to receive:
//   userType(string) - self or friend, determines if scratcher is scratchable and if visit level and note can be edited
//   countryId(string) - country that was clicked, needed for visit queries
//   userId(string) - user (not necessarily the loggedin user) whose map & country data is being viewed
//   
// props to give:  
//  scratchable(boolean) - What kind of map to display. Options are:
//     True - Display a scratchable map with flag overlay
//     False - Display a simple colored map.
//  urlMap(string/URL) - An image specifying the shape of the component.
//  urlFlag(string/URL) - An image to be overlaid on the map shape.
//  colorOutline(string/color) - The map shape is outlined in this color.
//  colorScratch(string/color) - Scratching the image reveals this color.
//  handleScratchAll(function) - A callback to invoke once fully scratched.
//  handleLoadingError(function) - A callback invoked if images can't load.