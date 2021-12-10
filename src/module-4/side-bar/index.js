import FiltersList from '../filters-list/index.js';

export default class SideBar {
  constructor (categoriesFilter = [], brandFilter = []) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;

    this.render();
    this.getfilter();
    this.addBtnEvent();
  }
  getTemplate () {
    return `
    <section class="filters-default">
      <div class="header-filters">
        <b class="header-filters__name">Filtres</b>
        <a class="header-filters__back" href="#">
            <img class="header-filters__image-back-arrow" src="img/4829860_arrow_back_left_icon.svg" />
        </a>
      </div>
      <div class="filters-navigation">

      </div>
      <button class="filters-default__buttonn-clear-all">Clear all filters</button>
    </section>`
  }

  render () {
    const sideBar = document.createElement('div');
    sideBar.innerHTML = this.getTemplate();
    this.element = sideBar;
  }

  getfilter () {
    const category = new FiltersList({
      title: "Category",
      list: this.categoriesFilter
    });

    const brand = new FiltersList({
      title: "Brand",
      list: this.brandFilter
    });

    const nav = this.element.querySelector(".filters-navigation");
    nav.append(category.element);
    nav.append(brand.element);
  }

  addBtnEvent () {
    this.element.addEventListener('click', event => {
      let nameEvent;
      if (event.target.closest('button')){
        nameEvent = `clear-filters`;
      }

      let myEvent = new CustomEvent(nameEvent, {
        bubbles:true
      });

      this.element.dispatchEvent(myEvent);
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
