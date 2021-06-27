import CountryCard from './country_card.js';
import { getAllCountries } from '../api/countries.api.js';
import { filterByValue, filterByRange } from './filters.js';
import { getAvgNeigbours, getAvgNumber, getMostComProperty } from './dashboard_stats.js'

const countriesCards = getAllCountries.map(el => new CountryCard(el));
let currentCards = [...countriesCards];

const renderCards = (value = '', from = '', to = '', array = [...countriesCards]) => {
  let cardsArray = array;
  cardsArray = filterByValue(cardsArray, value);
  cardsArray = filterByRange(cardsArray, from, to);

  const cardsField = document.getElementById('table-root');
  cardsField.innerHTML = '';
  cardsArray.forEach(el => {
    cardsField.appendChild(el.createCardTr());
  });
};
renderCards();

const searchInp = document.getElementById('table-search');
const lowRangeInp = document.getElementById('range-low');
const hightRangeInp = document.getElementById('range-hight');
[searchInp, lowRangeInp, hightRangeInp].forEach((el) => el.addEventListener('input', () => renderCards(searchInp.value, lowRangeInp.value, hightRangeInp.value)));

const sortElements = (sortFunc, arr) => {
  currentCards = sortFunc(arr);
  renderCards(searchInp.value, lowRangeInp.value, hightRangeInp.value, currentCards);
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

const displayMain = (clicked, unactive, clickedTab, unactiveTab) => {
  if (clicked.classList[1] !== 'active') {
    clicked.classList.add('active');
    unactive.classList.remove('active');
    clickedTab.classList.remove('hidden');
    unactiveTab.classList.add('hidden');
  }
};
const navMainBtn = document.getElementById('main-tab');
const mainContainer = document.getElementById('table-container');
const navDashBtn = document.getElementById('dashboard-tab');
const dashContainer = document.getElementById('dashboard-container');
navMainBtn.addEventListener('click', () => displayMain(navMainBtn, navDashBtn, mainContainer, dashContainer));
navDashBtn.addEventListener('click', () => displayMain(navDashBtn, navMainBtn, dashContainer, mainContainer));

// total number of countries:
const totNumberSpan = document.getElementById('tot-num');
const totNumberSpanContent = document.createTextNode(' ' + countriesCards.length);
totNumberSpan.appendChild(totNumberSpanContent);
// top 5 langueges:
const topLangSpan = document.getElementById('top-5-lan');
const topLangSpanContent = document.createTextNode(getMostComProperty(countriesCards, 'language'));
topLangSpan.appendChild(topLangSpanContent); 

//top 5 currencies:
const topCurrSpan = document.getElementById('top-5-curr');
const topCurrSpanContent = document.createTextNode(getMostComProperty(countriesCards, 'currency'));
topCurrSpan.appendChild(topCurrSpanContent); 
//avg population:
const avgPopulation = document.getElementById('avg-population');
const avgPopulationContent = document.createTextNode(getAvgNumber(countriesCards, 'population'));
avgPopulation.appendChild(avgPopulationContent); 
//avg area:
const avgArea = document.getElementById('avg-area');
const avgAreaContent = document.createTextNode(getAvgNumber(countriesCards, 'area'));
avgArea.appendChild(avgAreaContent); 
//avg number of neigbours:
const avgNeigbours = document.getElementById('avg-neigbours');
const avgNeigboursContent = document.createTextNode(getAvgNeigbours(countriesCards, 'neigbours'));
avgNeigbours.appendChild(avgNeigboursContent); 
 