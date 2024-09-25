import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  productCards = [];
  elem = null;
  filters = null;
  cardContainer = null;
  filteredProductCards = [];
  
  constructor(products) {
    for (let product of products) {
      this.productCards.push(new ProductCard(product));
    }
    this.filters = {
      noNuts: false, // true/false
      vegeterianOnly: false, // true/false
      maxSpiciness: 4, // числа от 0 до 4
      category: '', // уникальный идентификатор категории товара
    };
    this.filteredProductCards = this.productCards.filter(item => item);
    this.elem = createElement(this.#template());
    
    this.#render();
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters};

    this.filteredProductCards = this.productCards.filter(item => item);
    if(this.filters.noNuts == true) {
      this.filteredProductCards = this.filteredProductCards.filter(item => item.product.nuts == false || item.product.nuts === undefined);
    } 

    if(this.filters.vegeterianOnly == true) {
      this.filteredProductCards = this.filteredProductCards.filter(item => item.product.vegeterian == true); 
    } 

    if(this.filters.maxSpiciness !== undefined && this.filters.maxSpiciness !== null) {
      this.filteredProductCards = this.filteredProductCards.filter(item => +(item.product.spiciness) <= +(this.filters.maxSpiciness));
    } 

    if(this.filters.category != '') {
      this.filteredProductCards = this.filteredProductCards.filter(item => item.product.category == this.filters.category);
    }

    this.#render();
  }

  #template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner">
            
          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>
    `
  }

  #render() {
    let cardContainer = this.elem.querySelector('.products-grid__inner');
    cardContainer.textContent = '';
    for (let productCard of this.filteredProductCards) {
      cardContainer.append(productCard.render());
    }
    this.createListeners();
  }    

  // FIXME: Пофиксить в след релизе
  createListeners() {
    for (let productCard of this.filteredProductCards) {
      let cardButton = productCard.elem.querySelector('.card__button');      

      cardButton.addEventListener('click', () => {        
        this.elem.dispatchEvent (new CustomEvent("product-add", {
          detail: productCard.product.id, 
          bubbles: true 
        }));
      })
    }
    
    
  }

}
