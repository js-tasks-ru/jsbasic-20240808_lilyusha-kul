function getMinMax(str) {
  let arr = str.split(' ');
  let mapped = arr.map(num => +num);
  let newArr = [];
  for (let ar of mapped) {
    if (Number.isFinite(ar)) {
    newArr.push(ar);
    }
  }
  let mini = newArr.reduce((minim, current) => Math.min(minim, current));
  let maxi = newArr.reduce((maxim, current) => Math.max(maxim, current));
  let result = {min: mini, max: maxi};
  return result;
}
