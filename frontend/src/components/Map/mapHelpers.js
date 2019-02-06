

//== Map Helpers ===============================================================
/*
  Dummy data for use during testing.
  
  Consider detailing whether this code should remain forever to facilitate
  future development, of if it can be deleted once a certain milestone is met.
*/

//gets the country polygon information from the country code
export function getFeature(data, name) {
  return data.features.find(feature => feature.properties.ADMIN === name);
}

//massages the data into a form easily used in the map render
export function fixData(userArray) {
  let finalArray = [];
  userArray.forEach(user => {
    user.visits.forEach(visit => {
      let arrVisit = [visit.id, visit.country.id, visit.country.name, visit.level];
      finalArray.push(arrVisit);
    });
  });
  return finalArray.sort((a, b) => {
    return (a[3] > b[3]) ? 1: -1;
  });
}

//urls for if we choose to add a tile layer
export const tileURLs = {
  starting: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  gray: 'https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
  cartoVoyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
};
