import PlaceholderImage from '../assets/images/placeholder.webp';

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}

export const imageUrlFormatter = (url) => {
  if (url) {
    const SERVER_URL =
      process.env.REACT_APP_SERVER_URL || `http://localhost:1337`;

    return `${SERVER_URL}${url}`;
  }
};

export const imageErrorHandler = (currentTarget) => {
  currentTarget.onerror = null;
  currentTarget.src = require('../assets/images/placeholder.webp');
};

// Intl.NumberFormat
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
// https://fireship.io/snippets/currency-formatting/

export const convertToUSD = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // notation: "compact",
    // compactDisplay: "short",
  }).format(number);
};
