import { Auth0Lock } from 'auth0-lock';
import logo from '../../../assets/anchored_logo_only.png';

const options = {
  theme: {
    logo: logo,
    primaryColor: '#7344c1',
    foregroundColor: '#303A58',
  },
  languageDictionary: {
    title: 'Log In',
  },
  socialButtonStyle: 'small',
  auth: {
    sso: false,
    redirectUrl:
      process.env.REACT_APP_REDIRECT_URL ||
      'http://localhost:9000/auth/auth0/callback',
  },
};

export default class Auth0 {
  lock = new Auth0Lock(
    process.env.REACT_APP_CLIENT_ID,
    process.env.REACT_APP_DOMAIN_URL,
    options
  );

  login = () => {
    this.lock.show({ initialScreen: 'login' });
  };

  signUp = () => {
    this.lock.show({ initialScreen: 'signUp' });
  };
}
