function initCarousel() {

  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let inner = document.querySelector('.carousel__inner'); 
  let slide = document.querySelector('.carousel__slide');
  
  let currentSlide = 0;
  let slidesCount = document.querySelectorAll('.carousel__slide').length - 1;   

  let selfDisplayControl = function() {
    if (currentSlide == slidesCount) {
      arrowRight.style.display = 'none';
      arrowLeft.style.display = '';
    } else if (currentSlide == 0) {
      arrowLeft.style.display = 'none'; 
      arrowRight.style.display = '';
    } else {
      arrowRight.style.display = '';
      arrowLeft.style.display = '';
    }
  }

  let transformRight = function() {
      currentSlide = currentSlide + 1;
      let currentOffset = slide.offsetWidth * currentSlide;
      inner.style.transform = `translateX(-${currentOffset}px)`;
      selfDisplayControl();
  }
  
  let transformLeft = function() {
    currentSlide = currentSlide - 1;
    let currentOffset = slide.offsetWidth * currentSlide;
    inner.style.transform = `translateX(-${currentOffset}px)`;
    selfDisplayControl();
  }

  selfDisplayControl();
  
  arrowRight.addEventListener("click", transformRight);
  arrowLeft.addEventListener("click", transformLeft);
}
