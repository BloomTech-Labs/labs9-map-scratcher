
//dummy data for use during testing
const mapColorVisits = [{
      "country": {
        "name": "Portugal",
        "code": "PRT"
      },
      "level": 3
    },
    {
      "country": {
        "name": "Egypt",
        "code": "EGY"
      },
      "level": 4
    },
    {
      "country": {
        "name": "France",
        "code": "FRA"
      },
      "level": 2
    }];

//dummy data for use during testing
const mapBorderVisits = [{
      "country": {
        "name": "Brazil",
        "code": "BRA"
      },
      "level": 1
    },
    {
      "country": {
        "name": "France",
        "code": "FRA"
      },
      "level": 4
    }];

function getFeature(data, code) {
  return data.features.find(feature => feature.properties.ISO_A3 === code)
};

const tileURLs = {
  starting: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  gray: 'https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
  cartoVoyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
};


module.exports = {
  mapColorVisits,
  mapBorderVisits,
  getFeature
}
