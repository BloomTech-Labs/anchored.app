// SAVE THIS CODE IN CASE IT'S NEEDED LATER FOR AUTH0

// import auth0 from 'auth0-js';

// export default class Auth0 {
//   auth0 = new auth0.WebAuth({
//     domain: process.env.REACT_APP_DOMAIN_URL,
//     clientID: process.env.REACT_APP_CLIENT_ID,
//     redirectUri: 'http://localhost:3000/',
//     responseType: 'token id_token',
//     scope: 'openid',
//   });

//   login = () => {
//     this.auth0.authorize();
//   };

//   handleAuthentication = () => {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//         history.replace('/home');
//       } else if (err) {
//         history.replace('/home');
//         console.log(err);
//       }
//     });
//   };

//   setSession = authResult => {
//     // Set the time that the Access Token will expire at
//     let expiresAt = JSON.stringify(
//       authResult.expiresIn * 1000 + new Date().getTime()
//     );
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//     // navigate to the home route
//     history.replace('/home');
//   };

//   logout = () => {
//     // Clear Access Token and ID Token from local storage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('expires_at');
//     // navigate to the home route
//     history.replace('/home');
//   };

//   isAuthenticated = () => {
//     // Check whether the current time is past the
//     // Access Token's expiry time
//     let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//     return new Date().getTime() < expiresAt;
//   };
// }
