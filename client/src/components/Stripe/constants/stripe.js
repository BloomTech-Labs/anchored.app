// === For portfolio purposes, live Stripe was removed. ===
// === Uncomment below for production ready, active Stripe ===
const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PK_LIVE
    : process.env.REACT_APP_PK_TEST;

export default STRIPE_PUBLISHABLE;
