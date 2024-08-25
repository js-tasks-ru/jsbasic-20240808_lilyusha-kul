function highlight(table) {
  // table.rows.length - кол-во строк
  // получить аттрибут - поставить аттр
  // получить аттрибут - поставить класс
  // получить ячейку - поставить класс
  // получить ячейку - поставить стиль
  let tdList = table.querySelectorAll('td');
  for (let td of tdList) {
    if(!td.hasAttribute('data-available')) {
      td.parentNode.setAttribute('hidden', true);
    } else {
      let data = td.getAttribute('data-available');
      if(data == "true") {
        td.parentNode.classList.add('available');
      } else {
        td.parentNode.classList.add('unavailable');
      }
    }
    
    if(td.textContent == 'm'){
      td.parentNode.classList.add('male');
    } else {
      td.parentNode.classList.add('female');
    }
    
    let age = parseInt(td.textContent);
    if (age < 18) {
      td.parentNode.setAttribute('style', 'text-decoration: line-through');
    }
  } 
}
