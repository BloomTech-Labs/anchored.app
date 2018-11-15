const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PK_LIVE
    : process.env.REACT_APP_PK_TEST;

export default STRIPE_PUBLISHABLE;
