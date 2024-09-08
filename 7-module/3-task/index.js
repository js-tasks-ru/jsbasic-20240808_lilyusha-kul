import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  config = null;
  sliderSteps = null;
  slider = null;
  sliderValue = null;
  spanElements = null;
  thumb = null;
  progress = null;

  constructor({ steps, value = 0 }) {
    this.elem = this.render();
    this.config = { steps, value };

    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.sliderValue = this.elem.querySelector('.slider__value');

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    this.elem.addEventListener("click", this.changeStep);
    this.makeSpan();
  }

  changeStep = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.config.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    this.sliderValue.textContent = value;
    
    let sliderStepSpan = this.elem.querySelectorAll('.slider__steps span');
    for (let step of sliderStepSpan) {
      step.classList.remove('slider__step-active');
    }
    sliderStepSpan[value].classList.add('slider__step-active');

    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    }))
  }

  makeSpan() {
    for (let i = 0; i < this.config.steps; i ++) {
      let span = document.createElement('span');
      this.sliderSteps.append(span);
      if (i == 0) {
        span.classList.add('slider__step-active');
      }
    }
  }

  template() {
    return `
    <!--Корневой элемент слайдера-->
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
     
      </div>
    `
  }

  render(){
    return createElement(this.template());
  }
 }