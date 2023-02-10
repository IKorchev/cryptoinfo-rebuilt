const COUNT_ABBRS = ['', 'k', 'm', 'b', 't', 'qd', 'qt'];

type StringOrNumber = string | number;

export function formatBigNumber(stringOrNumber: StringOrNumber) {
  const number = Number(stringOrNumber);
  const i = 0 === number ? number : Math.floor(Math.log(number) / Math.log(1000));
  const result = `${parseFloat((number / Math.pow(1000, i)).toFixed(2))}${COUNT_ABBRS[i]}`;
  return result;
}

export function formatCurrency(stringOrNumber: StringOrNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(stringOrNumber));
}

export const formatToFixed = (stringOrNumber: StringOrNumber, decimals: number) => Number(stringOrNumber).toFixed(decimals);
