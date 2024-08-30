function toggleText() {
  let elem = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');
  elem.onclick = function () {
    if (!text.hidden) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }
  } 
}
