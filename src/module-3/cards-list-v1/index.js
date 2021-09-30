import Card from '../../module-2/card/index.js';

export default class CardsList {
  constructor ({data = [], Component = {}}) {
    this.data = data;
    this.Component = Component;

    this.render();
  }

  render () {
    const productCardsList = document.createElement("div");
    productCardsList.classList.add("catalog");
    this.element = productCardsList;

    for (const elem of this.data){
      const card  = new this.Component(elem);
      this.element.append(card.element);
    }
  }

  remove () {
    if(this.element){
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
  
}
