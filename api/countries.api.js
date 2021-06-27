const getAllCountries = await fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => response.json());

export { getAllCountries };