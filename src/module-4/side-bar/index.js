import FiltersList from '../filters-list/index.js';
import DoubleSlider from "../../module-5/double-slider/index.js";

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
      <div class="header-filters">
        <b class="header-filters__name">Filtres</b>
        <a class="header-filters__back" href="#">
            <img class="header-filters__image-back-arrow" src="img/4829860_arrow_back_left_icon.svg" />
        </a>
      </div>
      <div class="filters-navigation">

      </div>
      <button class="filters-default__buttonn-clear-all">Clear all filters</button>
`
  }

  render () {
    const sideBar = document.createElement('section');
    sideBar.classList.add("filters-default");
    sideBar.innerHTML = this.getTemplate();
    this.element = sideBar;

    this.renderSlider();
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

    return brand, category;
  }

  addBtnEvent () {
    this.element.addEventListener('click', event => {
      let nameEvent;
      if (event.target.closest('button')){
        nameEvent = `clear-filters`;

        const checkboxes = this.element.querySelectorAll('.first-filtres-list__checkbox-input');
        for (let checkbox of checkboxes) {
          checkbox.checked = false;
        }
      }

      let myEvent = new CustomEvent(nameEvent, {
        bubbles:true
      });

      this.element.dispatchEvent(myEvent);
    });
  }

  renderSlider () {
    const wrapper = this.element.querySelector('.filters-navigation');

    const doubleSlider = new DoubleSlider({});

    wrapper.append(doubleSlider.element);
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
