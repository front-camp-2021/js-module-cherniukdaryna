export default class FiltersList {
  constructor ({
     title = '',
     list = []
  } = {}) {
    this.title = title;
    this.list = list;

    this.render();
    this.addEvent();
  }

  getTemplate () {
    return `
        <div class="first-filtres-list">
        <p class="first-filtres-list__name--bold"><b>${this.title}</b></p>
          ${this.filtresList}        
        </div>

        <img class="filters-navigation__line" src="img/Divider.png" /><br>`
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
        id="${elem.title}" 
        ${elem.checked ? "checked" : ""} 
        category="${elem.value}"
      />
      <label 
        class="first-filtres-list__checkbox-input-label" 
        for="${elem.title}"
        >
        ${elem.title}
      </label>
      <br>`
    });
    return lists.join('');
  }

  addEvent () {
    this.element.addEventListener('change', event => {
      let name;

      if (event.target.closest('input') || event.target.closest('label')){
        if(event.target.checked){
          name = "add-filter";
        }
        else{
          name = "remove-filter";
        }
      }
      
      let myEvent = new CustomEvent(name, {
        bubbles:true,
        detail: event.target.value
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
