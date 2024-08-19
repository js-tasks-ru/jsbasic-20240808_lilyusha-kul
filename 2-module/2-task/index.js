function isEmpty(obj) {
  for (let key in obj) {
    if (key in obj) {
      return false;
    } else if (key === undefined) {
      return false;
    } else {
      return true;
    }
  } 
  return true;
}