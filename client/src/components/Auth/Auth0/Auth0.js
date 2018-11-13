import { Auth0Lock } from 'auth0-lock';

export default class Auth0 {
  lock = new Auth0Lock(
    process.env.REACT_APP_CLIENT_ID,
    process.env.REACT_APP_DOMAIN_URL,
    { auth: { redirectUrl: 'http://localhost:9000/auth/auth0/callback' } }
  );

  login = () => {
    this.lock.show({ initialScreen: 'login' });
  };

  signUp = () => {
    this.lock.show({ initialScreen: 'signUp' });
  };
}
