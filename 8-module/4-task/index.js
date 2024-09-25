import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    
    this.addEventListeners();
  }

  addProduct(product) {
    if(product == undefined || product.id == undefined) {
      return;
    }
    
    let cartItem = null;

    for (let item of this.cartItems) {
      if(item.product.id == product.id) {
        item.count = item.count + 1;
        cartItem = item;
        break;
      } 
    }

    if (cartItem == null) {
      cartItem = {product, count : 1};
      this.cartItems.push(cartItem);
    }
    
    this.onProductUpdate(cartItem);
    
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    let cartItemIndex = this.cartItems.findIndex(item => item.product.id === productId);
    console.log(cartItem);
    if(amount == 1) {
      cartItem.count = cartItem.count + 1;
    }
    if(amount == -1) {
      cartItem.count = cartItem.count - 1;
    }
    if (cartItem.count == 0) {
      this.cartItems.splice(cartItemIndex, 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if(this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    let sumCount = 0;
    for (let cartItem of this.cartItems) {
      sumCount = sumCount + cartItem.count;
    }
    return sumCount;
  }

  getTotalPrice() {
    let sumPrice = 0;
    for (let cartItem of this.cartItems) {
      sumPrice = sumPrice + cartItem.product.price * cartItem.count;
    }
    return sumPrice;
  }

  renderProduct (product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.open();
    this.modal.setTitle('Your order');
    
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    for (let cartItem of this.cartItems) {
      modalBody.append(this.renderProduct(cartItem.product, cartItem.count));
    }
   
    modalBody.append(this.renderOrderForm());

    this.modal.setBody(modalBody);
    
    let buttonsMinus = modalBody.querySelectorAll('.cart-counter__button_minus');
    for (let buttonMinus of buttonsMinus) {
      buttonMinus.addEventListener('click', (event) => {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);

      });
    }

    let buttonsPlus = modalBody.querySelectorAll('.cart-counter__button_plus');
    for (let buttonPlus of buttonsPlus) {
      buttonPlus.addEventListener('click', (event) => {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      })
    }
    
    let cartForm = modalBody.querySelector('.cart-form');
    cartForm.addEventListener('submit', (event) => this.onSubmit(event));
  }

  updateModal(){
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    for (let cartItem of this.cartItems) {
      modalBody.append(this.renderProduct(cartItem.product, cartItem.count));
    }
   
    modalBody.append(this.renderOrderForm());

    this.modal.setBody(modalBody);
    
    let buttonsMinus = modalBody.querySelectorAll('.cart-counter__button_minus');
    for (let buttonMinus of buttonsMinus) {
      buttonMinus.addEventListener('click', (event) => {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);
      });
    }

    let buttonsPlus = modalBody.querySelectorAll('.cart-counter__button_plus');
    for (let buttonPlus of buttonsPlus) {
      buttonPlus.addEventListener('click', (event) => {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      })
    }
    
    let cartForm = modalBody.querySelector('.cart-form');
    cartForm.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate() {
   
    this.cartIcon.update(this);
  
    // let modalBody = document.querySelector('.modal-body');

    if (document.body.classList.contains("is-modal-open")) {
      if (this.getTotalCount() == 0) {
        this.modal.close();
      } else {
        this.updateModal();
      }
    }
  }

  onSubmit(event) {
   
    // console.log(event.submitter);
     // event.submitter.classList.add('is-loading');
    event.preventDefault();

    let button = this.modal.elem.querySelector('button[type="submit"]');

    button.classList.add('is-loading'); 
  
    let formData = new FormData(this.modal.elem.querySelector('.cart-form'));
    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    });
    response
      .then(() => {
        this.modal.setTitle('Success!');
        this.cartItems.length = 0;
        let modalBody = createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
          `);
        this.modal.setBody(modalBody);
        // this.onProductUpdate();
        this.cartIcon.update(this);
      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

