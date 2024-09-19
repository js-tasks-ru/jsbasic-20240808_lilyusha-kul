import createElement from '../../assets/lib/create-element.js';

export default class Modal {
 elem = null;

    modalTitle = null;
    modalBodyAdd = null;
    closeButton = null;

  constructor() {
    this.elem = createElement(this.template);

    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBodyAdd = this.elem.querySelector('.modal__body');
    this.closeButton = this.elem.querySelector('.modal__close');

    this.closeButton.addEventListener("click", () => this.close());
    document.addEventListener('keydown', this.handler);      
  }

  handler = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
    // document.removeEventListener('keydown', this.handler);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  template = () => {
    return `
    <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
    
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title"> 
              Вот сюда нужно добавлять заголовок 
            
            </h3>
          </div>
    
          <div class="modal__body">
          
            A сюда нужно добавлять содержимое тела модального окна 
          </div>
        </div>
      </div>
    `
  }

  setTitle(title){
    this.modalTitle.textContent = title;
  }

  setBody(node){
    
    let modalBody = document.createElement('div');
    modalBody.append(node);
    this.modalBodyAdd.firstChild.remove();
    this.modalBodyAdd.append(modalBody);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.handler);  
  }

}
