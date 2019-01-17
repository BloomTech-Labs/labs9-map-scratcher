
//dummy data for use during testing

//gets the country polygon information from the country code
function getFeature(data, code) {
  return data.features.find(feature => feature.properties.ISO_A3 === code)
};

//massages the data into a form easily used in the map render
function fixData(userArray) {
  let finalArray = []
  userArray.map(user => {
    user.visits.map(visit => {
      finalArray.push(visit);
    })
  })
  return finalArray;
}

//urls for if we choose to add a tile layer
const tileURLs = {
  starting: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  gray: 'https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
  cartoVoyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
};


module.exports = {
  getFeature,
  fixData
}
