

//== Country Styles ============================================================
/*
  Colors to be used in the map to identify visit level.
  These are provided to Leaflet programmatically, as per the library's API.
*/

//-- Color Schemes -------------------------------
export const colorsBright = {
  0: 'silver',  //no interaction yet
  1: '#EF375F', //wishlist
  2: '#F3A534', //transited
  3: '#ADD049', //visited
  4: '#38B1Bf', //lived
  5: '#713E88', //hover
};

//orig back: 243352

//one combo: 2D4E83, e2e8e4
export const colorsFun = {
  0: '#707070', //no interaction yet
  1: '#D33C67', //wishlist
  2: '#E8BE50', //transited
  3: '#B3BB4C', //visited
  4: '#2D4E83', //lived
  5: '#713E88', //hover
};
export const colors = {
  0: '#EBEDE8', //no interaction yet
  1: '#D96459', //wishlist
  2: '#c21807', //transited
  3: '#800000', //visited
  4: '#7c0a02', //lived
  5: '#C5C9C6', //hover
};

// export const colors = {
//   0: '#EBEDE8', //no interaction yet
//   1: '#588C73', //wishlist
//   2: '#F2AE72', //transited
//   3: '#8C4646', //visited
//   4: '#D96459', //lived
//   5: '#C5C9C6', //hover
// };

//-- Map Region Styles ---------------------------
export const defaultStyle = {
  stroke: true,
  weight: 0.6,
  color: '#232323',
  fill: true,
  fillColor: colors[0],
  fillOpacity: 1,
};
export const hoverStyle = {
  stroke: true,
  weight: 1,
  color: 'black',
  fill: true,
  fillColor: colors[5],
  fillOpacity: 1,
};
export const colorStyle ={
  stroke: true,
  weight: 1,
  color: '#232323',
  fill: true,
  fillOpacity: 1,
};
export const borderStyle = {
  stroke: true,
  weight: 2,
  fill: false,
};
