import Pagination from '../../module-5/pagination/index.js';
import SideBar from '../../module-4/side-bar/index.js';
import CardsList from '../../module-3/cards-list-v1/index.js';
import Search from '../search/index.js';
import Card from '../../module-2/card/index.js';
import { request } from './request/index.js';
import { prepareFilters } from './prepare-filters/index.js';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

export default class Page {
  element;
  subElements = {};
  components = {};
  pageLimit = 10;
  totalPages = 100;
  filters = new URLSearchParams();
  categories = [];
  brands = [];
  products = [];
  activeFilters = {
    activeBrands: [],
    activeCategories: []
  };
  resultList = [];

  constructor() {
    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit);

    this.render();

  }

  get template () {
    return `<div class="wrapper">
        <header class="header">
        <img class="header__logo-header"src="img/logo.png"/>
        <a class="header__title" href="#">Online Store</a>
    </header>

    <nav class="top-navigation">
        <img class="top-navigation__image-home" src="img/3844435_home_house_icon.svg"/>

        <img class="top-navigation__arrow" src="img/4829859_arrow_next_right_icon.svg" />

        <a class="top-navigation__link" href="#">eCommerce</a>

        <img class="top-navigation__arrow" src="img/4829859_arrow_next_right_icon.svg" />

        <a class="top-navigation__link" href="#">Electronics</a>
    </nav>

    <div class="all-content" data-element="all">

        <section class="content" data-element="content">
            <div class="results">
              <span class="results__number">7,618 results found</span>

              <button class="results__like-butn">
                <img class="results__like-image" src="img/heart.svg"/>
              </button>
        </section>
    </div>
    </div>`
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;

    this.getSubElements();
    this.renderElements();
    this.getProducts();
    this.addFilterEvents();
    this.addPaginationEvent()
  }

  getSubElements () {
    const result = {};

    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    this.subElements = result;
  }

  async getData(url) {
    const [data, error] = await request( url);
    return [data, error];
  }

  async getFilters() {
    const [categories] = await this.getData(new URL("categories", BACKEND_URL));
    this.categories = prepareFilters(categories, "category");

    const [brands] = await this.getData(new URL("brands", BACKEND_URL));
    this.brands = prepareFilters(brands, "brands");
  }

  async getProducts () {
    this.products = await this.getData(new URL("products", BACKEND_URL));
  }

  renderElements () {
    this.getFilters().then(() => {
      this.components.sideBar = new SideBar( this.categories, this.brands );

      const { sideBar } = this.components;
      this.subElements.all.prepend(sideBar.element);
    });

    this.components.pagination = new Pagination({totalPages: 20, currentPage: 1});
    const { pagination } = this.components;
    this.subElements.all.append(pagination.element);

    this.components.search = new Search();
    const { search } = this.components;
    this.subElements.content.append(search.element);

    this.getProducts().then(() => {
      this.components.cardsList = new CardsList({data: this.products[0].slice(0, 9), Component: Card});

      const { cardsList } = this.components;
      this.subElements.content.append(cardsList.element);

    });
  }

  addFilterEvents () {
    this.element.addEventListener('add-filter', event => {

      const [key, value] = event.detail.split('=');

      key === 'category'
        ? this.activeFilters.activeCategories.push(value)
        : this.activeFilters.activeBrands.push(value);

      this.filtration(this.activeFilters.activeCategories, this.activeFilters.activeBrands);

    });

    this.element.addEventListener('remove-filter', event => {
      const [key, value] = event.detail.split('=');

      key === 'category'
        ? this.activeFilters.activeCategories = this.activeFilters.activeCategories.filter(item => item != value)
        : this.activeFilters.activeBrands = this.activeFilters.activeBrands.filter(item => item != value)

      this.filtration(this.activeFilters.activeCategories, this.activeFilters.activeBrands)
    } );
  }

  addPaginationEvent () {
    this.element.addEventListener('page-changed', event => {
      this.filtration(this.activeFilters.activeCategories, this.activeFilters.activeBrands, event.detail)
    });
  }

  filtration(categories, brands, page = 1) {

    this.resultList = this.products[0]
      .filter((item) => categories.length > 0
        ? categories.includes(item.category)
        : item.category)
      .filter((item) => brands.length > 0
        ? brands.includes(item.brand)
        : item.brand)

    this.resultList = this.resultList.slice(page * 9 - 9, page * 9)

    this.updateCardsList(this.resultList);
  }

  updateCardsList(data) {
    this.components.cardsList.update(data)
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
