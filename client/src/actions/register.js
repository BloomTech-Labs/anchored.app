export const REGISTERING = 'REGISTERING';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';

export const setUsername = username => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};

export const setPassword = password => {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
};
