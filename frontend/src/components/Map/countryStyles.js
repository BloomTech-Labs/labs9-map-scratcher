

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

// red
export const red = {
  0: '#EBEDE8', //no interaction yet
  1: '#f2c1c1', //wishlist
  2: '#ce8383', //transited
  3: '#984b4b', //visited
  4: '#762a2a', //lived
  5: '#C5C9C6', //hover
};

// tan
export const tan = {
  0: '#EBEDE8', //no interaction yet
  1: '#dbcebe', //wishlist
  2: '#ab967f', //transited
  3: '#785d41', //visited
  4: '#493726', //lived
  5: '#C5C9C6', //hover
};

// purple
export const purple = {
  0: '#EBEDE8', //no interaction yet
  1: '#dcd2e5', //wishlist
  2: '#ab90ba', //transited
  3: '#8b719a', //visited
  4: '#513863', //lived
  5: '#C5C9C6', //hover
};

// green
export const green = {
  0: '#EBEDE8', //no interaction yet
  1: '#c6eaca', //wishlist
  2: '#7db482', //transited
  3: '#46694b', //visited
  4: '#1d4522', //lived
  5: '#C5C9C6', //hover
};

// grey
export const grey = {
  0: '#EBEDE8', //no interaction yet
  1: '#d6d6d6', //wishlist
  2: '#909090', //transited
  3: '#5c5c5c', //visited
  4: '#2f2f2f', //lived
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
  fillColor: '#EBEDE8',
  fillOpacity: 1,
};
export const hoverStyle = {
  stroke: true,
  weight: 1,
  color: 'black',
  fill: true,
  fillColor: '#C5C9C6',
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
