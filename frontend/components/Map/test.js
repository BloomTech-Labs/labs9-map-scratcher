import geojson from './countries.geo.json'; 


export function getCountryShape(countryCode) {
  return geo.json.features.find(feature => feature.id === countryCode)
};

export const polygonBoundingBox = coordinates => {
  const bounds = {
    xMin: coordinates[0][0],
    xMax: coordinates[0][0],
    yMin: coordinates[0][1],
    yMax: coordinates[0][1]
  };

  coordinates.forEach(point => {
    if (point[0] < bounds.xMin) bounds.xMin = point[0];
    if (point[0] > bounds.xMax) bounds.xMax = point[0];
    if (point[1] < bounds.yMin) bounds.yMin = point[1];
    if (point[1] > bounds.yMax) bounds.yMax = point[1];
  });

  return bounds;
};

export const multiPolygonBoundingBox = shape => {
  const bounds = {
    xMin: shape[0][0][0][0],
    xMax: shape[0][0][0][0],
    yMin: shape[0][0][0][1],
    yMax: shape[0][0][0][1]
  };

  shape.forEach(coordinates => {
    coordinates[0].forEach(point => {
      if (point[0] < bounds.xMin) bounds.xMin = point[0];
      if (point[0] > bounds.xMax) bounds.xMax = point[0];
      if (point[1] < bounds.yMin) bounds.yMin = point[1];
      if (point[1] > bounds.yMax) bounds.yMax = point[1];
    });
  });
  return bounds;
};

export const getBoundingBox = geometry => {
  switch (geometry.type) {
    case 'Polygon':
      return polygonBoundingBox(geometry.coordinates[0]);
    case 'MultiPolygon':
      return multiPolygonBoundingBox(geometry.coordinates);
    default:
      console.log('NONE');
  }
};
