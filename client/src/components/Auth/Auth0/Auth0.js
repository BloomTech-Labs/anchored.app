import { Auth0Lock } from 'auth0-lock';

export default class Auth0 {
  lock = new Auth0Lock(
    '8OdWGN0vnxzYC0ZViS0B4plXc4MrO5j3',
    'chainpointdocusign.auth0.com',
    { auth: { redirectUrl: 'http://localhost:3333/auth/auth0/callback' } }
  );

  login = () => {
    this.lock.show({ initialScreen: 'login' });
  };

  signUp = () => {
    this.lock.show({ initialScreen: 'signUp' });
  };
}
