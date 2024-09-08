import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  ribbonArrowRight = null;
  ribbonArrowLeft = null;
  ribbonInner = null;
  ribbonItems = '';
  cutegoryButton = null;

  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();

    this.ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonInner = this.elem.querySelector('.ribbon__inner'); 
    this.ribbonItems = this.elem.querySelectorAll('.ribbon__item');

    this.arrowDisplayControl();

    this.ribbonArrowLeft.addEventListener("click", this.scrollInnerLeft);
    this.ribbonArrowRight.addEventListener("click", this.scrollInnerRight);
    this.ribbonInner.addEventListener("scroll", this.arrowDisplayControl);

    this.generateCategoryEvents();
  }
   
    generateCategoryEvents () {
    for (let category of this.categories) {
      let categoryButton = this.elem.querySelector(`[data-id="${category.id}"]`);
      categoryButton.addEventListener('click', (event) => {
        event.preventDefault();
      if (categoryButton.classList.contains("ribbon__item_active")){
        categoryButton.classList.remove('ribbon__item_active');
          } else {
            categoryButton.classList.add('ribbon__item_active');
          }
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
          detail: category.id, // уникальный идентификатора категории из её объекта
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        }))
      })
    }
  }

  arrowDisplayControl = () => {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollLeft == 0) {
      this.ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      this.ribbonArrowRight.classList.add('ribbon__arrow_visible');
    } else if (scrollRight < 1) {
      this.ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      this.ribbonArrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.ribbonArrowRight.classList.add('ribbon__arrow_visible');
      this.ribbonArrowLeft.classList.add('ribbon__arrow_visible');
    }
  }

  scrollInnerLeft = () => {
    this.ribbonInner.scrollBy(-350, 0);
    }
  
  scrollInnerRight = () => {
     this.ribbonInner.scrollBy(350, 0);
    }
  
  template() {
    return `
     <!--Корневой элемент RibbonMenu-->
  <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    ${this.generateRibbonItems()}
    </nav>
    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `
  }

  generateRibbonItems() {
  let result = '';
      for (let category of this.categories) {
        result += `
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
        `
      }
      return result;
  }
  
  render() {
    return createElement(this.template());
  } 
}