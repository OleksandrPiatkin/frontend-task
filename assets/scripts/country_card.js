export default class CountryCard {
  constructor(obj) {
    this.area = obj.area;
    this.currency = obj.currencies;
    this.flagUrl = obj.flag;
    this.language = obj.languages;
    this.name = obj.name;
    this.population = obj.population;
  }

  createCardTd(label, text) {
    const td = document.createElement('td');
    td.innerHTML = text;
    td.setAttribute('data-label', label);

    return td;
  }

  createFlagTag() {

  }

  createCardTr() {
    const tr = document.createElement('tr');
    tr.appendChild(this.createCardTd('Name', this.name));
    tr.appendChild(this.createCardTd('Currency', this.currency[0].name));
    tr.appendChild(this.createCardTd('Language', this.language[0].name));
    tr.appendChild(this.createCardTd('Population', this.population));
    tr.appendChild(this.createCardTd('Area', this.area));
    tr.appendChild(this.createCardTd('Flag', this.flagUrl));

    return tr;
  }
}