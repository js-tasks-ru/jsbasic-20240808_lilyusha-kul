function camelize(str) {
  let arr = str.split('-');
  let mapped = arr.map (function(word, index) {
        if (index == 0) { 
        return word
        } else {
        return word[0].toUpperCase() + word.slice(1);
        }
   })
   return mapped.join('');
}
