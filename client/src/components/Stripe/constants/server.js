const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:9000/payment';

export default PAYMENT_SERVER_URL;
