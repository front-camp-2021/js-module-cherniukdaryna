import { debounce } from '../../module-1/debounce/index.js';

export default class Search {
  element;

  constructor() {
    this.value = '';
    this.render();
  }

  getTemplate() {
    return `
      <input class="search__input" type="search" id="search" placeholder="  Search"/>

      <button class="search__btn-glass">
        <img class="search__image-search" src="img/4801315_glass_magnifier_magnifying_search_searching_icon.svg"/>
      </button>`
  }

  render() {
    const search = document.createElement('div');
    search.classList.add("search");
    search.innerHTML = this.getTemplate();
    this.element = search;

    this.addEvent()
  }

  debounce = (fn, delay = 0) => {
    let timeout;
    return function(){
      const functionCall = () => {fn.apply(this, arguments)};

      clearTimeout(timeout);

      timeout = setTimeout(functionCall, delay);
    };
  }

  dispatchEvent (string) {
    this.element.dispatchEvent(
      new CustomEvent(
        'search-filter',
        {
          bubbles: true,
          detail: string
        })
    )
  }

  addEvent () {
    this.element.addEventListener('keyup', event => {
      if (event.target.className === 'search__input'){
        this.value = event.target.value;

        this.dispatchEvent(this.value);
      }
    });
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
