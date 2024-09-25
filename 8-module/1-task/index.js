import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  initialTopCoord = 0;
  constructor() {
    this.render();
    this.initialTopCoord = this.elem.getBoundingClientRect().top + window.scrollY;

    this.addEventListeners();
  } 

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    console.log('call update');
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;
      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth > 0 || this.elem.offsetHeight > 0) {
      console.log('scrill > top');
      console.log(window.scrollY);
      console.log(this.initialTopCoord);

      if (window.scrollY > this.initialTopCoord) {
        
      // плавающая корзина
        let leftIndent = Math.min(
          document.querySelector('.container').getBoundingClientRect().right + 20,
          document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + 'px';

        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          zIndex: 1e3,
          right: '10px',
          left: leftIndent
        });
      } else {
        // корзина сверху
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          left: '',
          zIndex: ''
        });
      }

      if (document.documentElement.clientWidth <= 767) {
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          left: '',
          zIndex: ''
        });
      }
    }
  }
}
