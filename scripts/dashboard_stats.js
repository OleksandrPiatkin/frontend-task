const getMostComProperty = (arr, property) => {
  const props = arr.flatMap((el) => el[property])
    .flatMap((el) => el.name);

  let counter = {};
  props.forEach((value) => {
    if (value in counter) {
      counter[value] += 1;
    } else {
      counter[value] = 1;
    }
  });
  const sortedCounter = Object.entries(counter)
    .sort((a, b) => b[1] - a[1]);

  const resultArray = sortedCounter.slice(0, 5);
  const result = resultArray.reduce((acc, current) => acc + ` ${current[0]}(${current[1]}),`,'');
  return result.slice(0, -1) + '.';
};

const getAvgNumber = (arr, property) => {
  const sum = arr.reduce((acc, curr) => acc + curr[property], 0);
  return Math.round(sum / arr.length);
};

const getAvgNeigbours = (arr, property) => {
  const sum = arr.reduce((acc, curr) => acc + Object.entries(curr[property]).length, 0);
  return Math.round(sum / arr.length);
};

export { getAvgNeigbours, getAvgNumber, getMostComProperty };
