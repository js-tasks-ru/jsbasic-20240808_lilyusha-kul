/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null; 
  rows = []; 
 
  constructor(rows) {
    this.rows = rows;
    
    this.elem = document.createElement('table');
    let thead = document.createElement('thead');
    let name = document.createElement('th');
    name.textContent = 'Имя';
    thead.appendChild(name);
    
    let age = document.createElement('th');
    age.textContent = 'Возраст';
    thead.appendChild(age);

    let salary = document.createElement('th');
    salary.textContent = 'Зарплата';
    thead.appendChild(salary);

    let city = document.createElement('th');
    city.textContent = 'Город';
    thead.appendChild(city);

    this.elem.appendChild(thead);

    this.changeArr();
  }

  changeArr() {
    let tbody = document.createElement('tbody');
    for (let row of this.rows) {
      let tr = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = row.name;
      tr.appendChild(td);

      let td2 = document.createElement('td');
      td2.textContent = row.age;
      tr.append(td2);
     
      let td3 = document.createElement('td');
      td3.textContent = row.salary;
      tr.append(td3);

      let td4 = document.createElement('td');
      td4.textContent = row.city;
      tr.append(td4);

      let td5 = document.createElement('td');
      td5.innerHTML = '<button>X</button>';
      tr.append(td5);

      tbody.appendChild(tr);

      td5.onclick = function(){
        td5.parentNode.remove();
      }  
    }
    this.elem.appendChild(tbody);
  } 

}
