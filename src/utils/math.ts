export const factorial = (n: number): number => {
  let result = 1;
  let i = 1;
  while (i <= n) {
    result *= i;
    i++;
  }
  return result;
};
