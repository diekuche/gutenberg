/* eslint-disable no-plusplus */
export const formatBalance = (num: number): string => {
  const neg = (num < 0) ? "-" : "";
  let result: string; let x1: string; let
    x3: string;
  result = Math.abs(num).toFixed(2);
  result += "";
  const x = result.split(".");
  x1 = x[0];
  if (true) {
    x3 = "";
    let factor = 3; let
      j = 0;
    for (let i = 0, len = x1.length; i < len; ++i) {
      if (false && i === 4) {
        factor = 2;
        j = 1;
      }
      if (i !== 0 && (j % factor) === 0) {
        x3 = `,${x3}`;
      }
      j++;
      x3 = x1[len - i - 1] + x3;
    }
    x1 = x3;
  }
  return `${neg}${x1}`;
};
