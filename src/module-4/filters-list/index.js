export default class FiltersList {
  constructor ({
     title = '',
     list = []
  } = {}) {
    this.title = title;
    this.list = list;

    this.render();
  }

  getTemplate () {
    return `<section class="filters-default">

      <div class="header-filters">
        <b class="header-filters__name">Filtres</b> 
        <a class="header-filters__back" href="#">
            <img class="header-filters__image-back-arrow" src="img/4829860_arrow_back_left_icon.svg" />
        </a> 
      </div>
      <div class="filters-navigation">
      
        <div class="first-filtres-list">
        <p class="first-filtres-list__name--bold"><b>${this.title}</b></p>
          ${this.filtresList}        
        </div>

        <img class="filters-navigation__line" src="img/Divider.png" /><br>

        <div class="second-filtres-list">
        <p class="first-filtres-list__name--bold"><b>${this.title}</b></p>                                                      
          ${this.filtresList} 
        </div>

        <img class="filters-navigation__line" src="img/Divider.png" /><br>

        <div class="third-filtres-list">
        <p class="first-filtres-list__name--bold"><b>${this.title}</b></p>
          ${this.filtresList}                                 
        </div>
      </div>
    </section>`
  }

  render(){
    const filtersList = document.createElement('div');
    filtersList.innerHTML = this.getTemplate();
    this.element = filtersList;
  }

  get filtresList () {
    const lists = this.list.map(elem => {
      return `
      <input 
        class="first-filtres-list__checkbox-input" 
        type="checkbox" 
        id="cell" 
        value="${elem.value}"
        ${elem.checked ? "checked" : ""} 
      />
      <label 
        class="first-filtres-list__checkbox-input-label" 
        for="cell"
        >
        ${elem.title}
      </label>
      <br>`
    });
    return lists.join('');
  }

  addEvent () {
    this.element.addEventListener('click')
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
