const filterByValue = (array, value) => {

  let result = array.filter((el) => {
    let activeProperties = [];
    activeProperties.push(el.name);
    activeProperties.push(el.area);
    activeProperties.push(el.population);
    activeProperties.push(el.currency.flatMap(curr=>curr.name).join(' '));
    activeProperties.push(el.language.flatMap(lan=>lan.name).join(' '));

    const resultFilters = activeProperties.join(' ').toLocaleLowerCase();
    return resultFilters.includes(value.toLowerCase());
  });
  return result;
};

const filterByRange = (array, from, to) => {
  const fromNum = from === '' ? 0 : Number(from);
  const toNum = to === '' ? Infinity : Number(to);
  return array.filter((el) => ((el.population >= fromNum) && (el.population <= toNum)) ? true : false);
};

export { filterByValue, filterByRange };
