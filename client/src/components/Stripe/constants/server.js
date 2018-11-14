const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://chainpoint-docusign-server.herokuapp.com/'
    : 'http://localhost:9000';

export default PAYMENT_SERVER_URL;
