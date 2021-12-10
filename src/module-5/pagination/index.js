export default class Pagination {
  element;
  start = 0;
  pageIndex = 0;

  constructor({
    totalPages = 10,
    currentPage = 1,
  } = {}) {
    this.totalPages = totalPages;
    this.currentPage = currentPage;

    this.render();

  }

  getTemplate () {
    return `
    <footer class="footer">
        <a class="footer__arrow-back-left" href="#">
          <img class="footer__image-arrow-back-left" src="img/2931162_arrow_back_left_direction_move_icon.svg" />
        </a>

        <div class="links-list">

        </div>

        <a class="footer__arrow-forward-right" href="#">
          <img class="footer__image-arrow-forward-right" src="img/2931159_arrow_forward_right_move_navigation_icon.svg"/>
        </a>
    </footer>`
  }

  render () {
    const pagination = document.createElement('div');
    pagination.innerHTML = this.getTemplate();
    this.element = pagination;

    this.addEvent();
    this.update();
  }

  update () {
    const pageWrapper = this.element.querySelector('.links-list');
    pageWrapper.innerHTML = this.createPageItem();
  }

  createPageItem () {
    const pagesArray =  Array.from({length: this.totalPages}, (_,i) => i+1);

    return pagesArray.map((item) => {
      if(item === this.currentPage) {
        return `<a class="links-list__link active" href="#">${item}</a>`
      }

      else
        return `<a class="links-list__link" href="#">${item}</a>`
    }).join('')
  }

  addEvent () {
    this.element.addEventListener('click', event => {
      if (event.target.className === 'links-list__link'){
        const page = +event.target.outerText;
        this.currentPage = page;

        this.dispatchEvent(page);

        this.update();
      }

      else if (event.target.className === 'footer__arrow-back-left'){
          this.goToPrevPage();
      }

      else if (event.target.className === 'footer__arrow-forward-right') {
        this.goToNextPage();
      }
    });
  }

  dispatchEvent (page) {
    this.element.dispatchEvent(
      new CustomEvent(
        'page-changed',
        {
          bubbles: true,
          detail: page
        })
    )
  }

  goToPrevPage () {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
    else {
      this.currentPage = this.currentPage;
    }

      this.dispatchEvent(this.currentPage);

      this.update()
  }

  goToNextPage () {
    if (this.currentPage < 20) {
      this.currentPage = this.currentPage + 1;
    }
    else {
      this.currentPage = this.currentPage;
    }

    this.dispatchEvent(this.currentPage);

    this.update()
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
