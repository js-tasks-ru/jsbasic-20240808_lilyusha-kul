function checkSpam(str) {
  let up = str.toUpperCase();
  if (up.includes("1XBET") || up.includes("XXX")) {
    return true;
  } else {
    return false;
  }
}
