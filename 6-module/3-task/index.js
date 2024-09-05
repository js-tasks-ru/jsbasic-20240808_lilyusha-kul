import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;

  arrowRight = null;
  arrowLeft = null;
  inner = null;
  slide = null;
    
  currentSlide = 0;
  slidesCount = null;

  constructor(slides) {
    this.slides = slides;
  
    this.elem = this.render();

    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.inner = this.elem.querySelector('.carousel__inner'); 
    this.slide = this.elem.querySelector('.carousel__slide');
      
    this.currentSlide = 0;
    this.slidesCount = this.elem.querySelectorAll('.carousel__slide').length - 1; 
    
    this.selfDisplayControl();
    this.arrowRight.addEventListener("click", this.transformRight);
    this.arrowLeft.addEventListener("click", this.transformLeft);

    this.generateEvents();
  }

  generateEvents() {
    for (let slide of this.slides) {
      let slideButton = this.elem.querySelector(`[data-id="${slide.id}"]`);
      slideButton.addEventListener('click', () => {
        this.elem.dispatchEvent (new CustomEvent("product-add", {
          detail: slide.id, 
          bubbles: true 
        }));
      })
    }
  }

  selfDisplayControl() {
    if (this.currentSlide == this.slidesCount) {
      this.arrowRight.style.display = 'none';
      this.arrowLeft.style.display = '';
    } else if (this.currentSlide == 0) {
      this.arrowLeft.style.display = 'none'; 
      this.arrowRight.style.display = '';
    } else {
      this.arrowRight.style.display = '';
      this.arrowLeft.style.display = '';
    }
  }

  transformRight = () => {
    this.currentSlide = this.currentSlide + 1;
    let currentOffset = this.slide.offsetWidth * this.currentSlide;
    this.inner.style.transform = `translateX(-${currentOffset}px)`;
    this.selfDisplayControl();
  }
  
  transformLeft = () => {
    this.currentSlide = this.currentSlide - 1;
    let currentOffset = this.slide.offsetWidth * this.currentSlide;
    this.inner.style.transform = `translateX(-${currentOffset}px)`;
    this.selfDisplayControl();
  }

  template() {
    return `
      <!--Корневой элемент карусели-->
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${this.generateSliderItems()}
        </div>
      </div>
    `}
    
    generateSliderItems() {
      let result = '';
      for (let slide of this.slides) {
        result += `
          <div class="carousel__slide" data-id=${slide.id}>
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `
      }
      return result;
    }

    render() {
      return createElement(this.template());
    }  
}

  

