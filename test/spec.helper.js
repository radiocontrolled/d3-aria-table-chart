const json = {
  "2017-02-01": {"All property types": 0.26, "Detached houses": 0.05, "Semi-detached houses": 0.24, "Terraced houses": 0.36, "Flats and maisonettes": 2},
  "2017-03-01": {"All property types": -0.19, "Detached houses": 0.32, "Semi-detached houses": 0.08, "Terraced houses": -0.43, "Flats and maisonettes": -0.79}
};

const processedData = [
  {
    'date': new Date(2017, 1, 1),
    'all-property-types': 0.26,
    'detached-houses': 0.05,
    'semi-detached-houses': 0.24,
    'terraced-houses': 0.36,
    'flats-and-maisonettes': 2
  },
  {
    'date': new Date(2017, 2, 1),
    'all-property-types': -0.19,
    'detached-houses': 0.32,
    'semi-detached-houses': 0.08,
    'terraced-houses': -0.43,
    'flats-and-maisonettes': -0.79
  }
];

module.exports = {
  json: json,
  processedData: processedData
};