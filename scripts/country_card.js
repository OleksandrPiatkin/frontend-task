export default class CountryCard {
  constructor(obj) {
    this.area = obj.area;
    this.currency = obj.currencies;
    this.flagUrl = obj.flag;
    this.language = obj.languages;
    this.name = obj.name;
    this.population = obj.population;
    this.neigbours = obj.borders;
  }

  createCardTd(label, tags) {
    const td = document.createElement('td');
    td.setAttribute('data-label', label);
    tags.forEach((el) => td.appendChild(el));

    return td;
  }

  createSpan(text) {
    const span = document.createElement('span');
    const spanContent = document.createTextNode(text);
    span.appendChild(spanContent);

    return [span];
  }

  createNamedSpans(propertyArray, ...properties) {
    return propertyArray.flatMap((el) => {
      const span = document.createElement('span');
      span.classList.add('named-span');
      properties.forEach(property => {
        if (el[property]) {
          const spanContent = document.createTextNode(` ${el[property]}`);
          span.appendChild(spanContent);
        }
      })
      return span;
    });
  }

  createFlagImage(flagUrl) {
    const img = document.createElement('img');
    img.classList.add('flag-img')
    img.setAttribute('src', flagUrl);

    return [img];
  }

  createCardTr() {
    const tr = document.createElement('tr');
    tr.appendChild(this.createCardTd('Name', this.createSpan(this.name)));
    tr.appendChild(this.createCardTd('Currency', this.createNamedSpans(this.currency, 'name', 'symbol')));
    tr.appendChild(this.createCardTd('Language', this.createNamedSpans(this.language, 'name')));
    tr.appendChild(this.createCardTd('Population', this.createSpan(this.population)));
    tr.appendChild(this.createCardTd('Area', this.createSpan(this.area)));
    tr.appendChild(this.createCardTd('Flag', this.createFlagImage(this.flagUrl)));

    return tr;
  }
}
