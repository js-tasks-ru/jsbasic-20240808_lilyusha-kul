function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }

  for ( i = n; i > 1; i-- ) {
    n = n * (i - 1);
  }

  return n;
}

