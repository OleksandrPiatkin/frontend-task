import CountryCard from './country_card.js';


const allCountries = await fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => response.json());

const countriesCards = allCountries.map(el => new CountryCard(el));
let currentCards = [...countriesCards];

const renderCards = (cardsArray) => {
  const cardsField = document.getElementById('table-root');
  cardsField.innerHTML = '';
  cardsArray.forEach(el => {
    cardsField.appendChild(el.createCardTr());
  });
};
renderCards(countriesCards);

const searchByValue = (value) => {
  const result = [...countriesCards].filter((el) => {
    let activePropertys = {...el};
    delete activePropertys.flagUrl;
    activePropertys = Object.values(activePropertys).flat();
    activePropertys = activePropertys.map((el) => {
      if (typeof el === 'object' && el !== null) {
        return Object.values(el);
      }
      return el;
    });
    const resultString = activePropertys.flat().join(' ');
    return resultString.indexOf(value) > -1 ? true : false;
  });
  currentCards = result;
  renderCards(currentCards);
};
const searchInput = document.getElementById('table-search');
searchInput.addEventListener('input', () => searchByValue(searchInput.value));

const filterByPopulation = (from, to) => {
  const fromNum = from === '' ? 0 : from;
  const toNum = to === '' ? Infinity : to;
  console.log(fromNum, toNum);
};
const lowRangeInput = document.getElementById('range-low');
const hightRangeInput = document.getElementById('range-hight');
lowRangeInput.addEventListener('input', () => filterByPopulation(lowRangeInput.value, hightRangeInput.value));
hightRangeInput.addEventListener('input', () => filterByPopulation(lowRangeInput.value, hightRangeInput.value));


const sortElements = (sortFunc, arr) => {
  currentCards = sortFunc(arr);
  renderCards(currentCards);
};

const ascNameBtn = document.getElementById('asc-name');
const sortNameAsc = (arr) => arr.sort((a, b) => a.name.localeCompare(b.name));
ascNameBtn.addEventListener('click', () => sortElements(sortNameAsc, currentCards));

const descNameBtn = document.getElementById('desc-name');
const sortNameDesc = (arr) => sortNameAsc(arr).reverse();
descNameBtn.addEventListener('click', () => sortElements(sortNameDesc, currentCards));

const ascCurrencyBtn = document.getElementById('asc-currency');
const sortCurrencyAsc = (arr) => arr.sort((a, b) => a.currency[0].name.localeCompare(b.currency[0].name));
ascCurrencyBtn.addEventListener('click', () => sortElements(sortCurrencyAsc, currentCards));

const descCurrencyBtn = document.getElementById('desc-currency');
const sortCurrencyDesc = (arr) => sortCurrencyAsc(arr).reverse();
descCurrencyBtn.addEventListener('click', () => sortElements(sortCurrencyDesc, currentCards));

const ascLangBtn = document.getElementById('asc-language');
const sortLanguageAsc = (arr) => arr.sort((a, b) => a.language[0].name.localeCompare(b.language[0].name));
ascLangBtn.addEventListener('click', () => sortElements(sortLanguageAsc, currentCards));

const descLangBtn = document.getElementById('desc-language');
const sortLanguageDesc = (arr) => sortLanguageAsc(arr).reverse();
descLangBtn.addEventListener('click', () => sortElements(sortLanguageDesc, currentCards));

const ascPopulationBtn = document.getElementById('asc-population');
const sortPopulationAsc = (arr) => arr.sort((a, b) => a.population - b.population);
ascPopulationBtn.addEventListener('click', () => sortElements(sortPopulationAsc, currentCards));

const descPopulationBtn = document.getElementById('desc-population');
const sortPopulationDesc = (arr) => sortPopulationAsc(arr).reverse();
descPopulationBtn.addEventListener('click', () => sortElements(sortPopulationDesc, currentCards));

const ascAreaBtn = document.getElementById('asc-area');
const sortAreaAsc = (arr) => arr.sort((a, b) => a.area - b.area);
ascAreaBtn.addEventListener('click', () => sortElements(sortAreaAsc, currentCards));

const descAreaBtn = document.getElementById('desc-area');
const sortAreaDesc = (arr) => sortAreaAsc(arr).reverse();
descAreaBtn.addEventListener('click', () => sortElements(sortAreaDesc, currentCards));