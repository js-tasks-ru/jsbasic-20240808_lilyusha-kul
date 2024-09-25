import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  carousel = null;
  ribbonMenu = null;
  cartIcon = null;
  cart = null;
  productsGrid = null;
  stepSlider = null;

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.cart = new Cart(new CartIcon());
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    }); 
  }

  async render() {
  
    let dataCarouselHolder = document.querySelector('[data-carousel-holder]');
    dataCarouselHolder.append(this.carousel.elem);

    let dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    dataRibbonHolder.append(this.ribbonMenu.elem);

    let dataSliderHolder = document.querySelector('[data-slider-holder]');
    dataSliderHolder.append(this.stepSlider.elem);

    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cart.cartIcon.elem);
  
    let response = await fetch('products.json');
  
    let products = await response.json();
    
    let productsGrid = new ProductsGrid(products);
    
    let productGridHolder = document.querySelector('[data-products-grid-holder]');
    productGridHolder.innerHTML = '';
    productGridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: ''
    });

    document.body.addEventListener('product-add', (event) => {      
      for(let product of products) {
        if(product.id == event.detail) {
          this.cart.addProduct(product);
        }
      }
    })

    document.body.addEventListener('slider-change', function(event) {
      console.log(event.detail);
      productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    })

    document.body.addEventListener('ribbon-select', function(event) {
      productsGrid.updateFilter({
        category: event.detail,
      });
    })

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      if (event.target.checked) {
       productsGrid.updateFilter({ noNuts: true });
      } else {
        productsGrid.updateFilter({ noNuts: false });
      }
    })

  document.getElementById('vegeterian-checkbox').addEventListener('change', function(event) {
    if (event.target.checked) {
      productsGrid.updateFilter({ vegeterianOnly: true, });
    } else {
      productsGrid.updateFilter({ vegeterianOnly: false, });
    }
  })
  }
}