const getMaxOfData = (data) => {
  const arr = data.map((el) => {
    const innerArr = [];
    for (let i in el) {
      if(i !== 'date') innerArr.push(el[i]);
    }
    return innerArr;
  });

  const flattenedArr = arr.reduce((a, b) => a.concat(b), []);
  return Math.max(...flattenedArr);
};

const getData = (path) => {
  const d3 = require('d3');
  return new Promise((resolve, reject) => {
    d3.json(path, (err, data) => {
      if(err) reject(err);
      else {
        resolve(data);
      }
    });
  });
};


const processRawData = (data) => {
  let arr = [];
  for (let i in data) {
    const year = parseInt(i.match(/[0-9]{4}/), 10);
    const month = parseInt(`${i.charAt(5)}${i.charAt(6)}`, 10) - 1;
    const day = parseInt(`${i.charAt(8)}${i.charAt(9)}`, 10);

    arr.push({
      date: new Date(year, month, day),
      "all-property-types": data[i]["All property types"],
      "detached-houses": data[i]["Detached houses"],
      "semi-detached-houses": data[i]["Semi-detached houses"],
      "terraced-houses": data[i]["Terraced houses"],
      "flats-and-maisonettes": data[i]["Flats and maisonettes"]
    });
  }

  return arr.sort((a, b) => {
    return a.date - b.date;
  });
};

const getCategoriesToVisualise = (arrayOfObjects, objectPropertyToFilter) => {
  return Object.keys(arrayOfObjects[0]).filter((category => category !== objectPropertyToFilter));
};

module.exports = {
  getCategoriesToVisualise: getCategoriesToVisualise,
  processRawData: processRawData,
  getData: getData,
  getMaxOfData: getMaxOfData
};
