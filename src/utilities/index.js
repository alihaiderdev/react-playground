import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const placeholderImageUrl =
  'https://quickbooks.intuit.com/oidam/intuit/sbseg/en_row/quickbooks/web/content/default-placeholder.png';

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
  // currentTarget.src = PlaceholderImage;
  // currentTarget.src = require('../assets/images/placeholder.webp');
  currentTarget.src = placeholderImageUrl;
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

// https://whereisthemouse.com/how-to-use-withrouter-hoc-in-react-router-v6-with-typescript

/**
 * Create custom withRouter Higher Order Component
 * @param {any} Component
 * @returns
 */

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  };
  return ComponentWithRouterProp;
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
// https://stackoverflow.com/questions/68782781/react-router-v6-history-listen
// I would hate to use useLocation because it also renders if the state changes,

// https://www.bezkoder.com/handle-jwt-token-expiration-react/#:~:text=There%20are%20two%20ways%20to%20check%20if%20Token%20is%20expired%20or%20not.&text=I%20will%20show%20you%20the,us%20the%20token%20is%20expired

const AuthVerify = (props) => {
  let location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (Object.keys(user || {})?.length > 0) {
      const decodedJwt = parseJwt(user.jwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logout();
      }
    }
  }, [location, props]);

  return null;
};

export default AuthVerify;

// Method 1:
// Array.isArray(variable)

// Method 2:
// variable instanceof Array

// Method 3:
// variable.constructor === Array
export const getIds = (items) => {
  if (Array.isArray(items) && items?.length > 0) {
    return items?.map((d) => d.id);
  }
};

export const getListAsync = ({ type, url }) =>
  createAsyncThunk(type, (url) => {
    return axios(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => ({ products: data.data, meta: data.meta.pagination }))
      .catch((error) => error.message);
  });

export const success = (text) => {
  message.success(text);
};

export const error = (text) => {
  message.error(text);
};
