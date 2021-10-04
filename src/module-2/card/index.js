export default class Card {
  element;

  constructor ({
    id = '',
    images = [],
    title = '',
    rating = 0,
    price = 0,
    category = '',
    brand = ''
  } = {}) {
    this.id = id;
    this.images = images;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.category = category;
    this.brand = brand;

    this.render();
  }

  getTemplate () {
    return `<div class="product-card" data-element="body">
      <div class="image">
          <img class="image__goods" src="${this.images[0]}" />
      </div>

      <div class="rating-price">
          <div class="rating">
          <span>${this.rating}</span>
              <img class="rating__image-star" src="img/star.svg"/>
          </div>
          
          <p class="price">${this.price}</p>
      </div>
                          
      <p class="product-card__name">${this.brand} ${this.category}</p>
      <p class="product-card__information">${this.title}</p>

      <div class="product-card-buttons">
          <button class="product-card-buttons__wishlist">
            <img class="product-card-buttons__image-heart" src="img/heart.svg"/>
            <span class="product-card-buttons__name">WISHLIST</span>
          </button><button class="product-card-buttons__add">
            <img class="product-card-buttons__image-basket" src="img/basket.svg"/>
            <span class="product-card-buttons__name">ADD TO CART</span>
          </button>
      </div> 
    </div>`
  }

  render(){
    const productCardWrapper = document.createElement('div');
    productCardWrapper.innerHTML = this.getTemplate();
    this.element = productCardWrapper.firstElementChild;
  }

  remove(){
    if(this.element){
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}
