import React from 'react';

const Register = props => {
  return (
    <div className={'RegisterWrapper'}>
      <h1 className={'Reg-color'}>Registration</h1>
      <form>
        <label>Username:</label>
        <input type="text" name="username" />
        <label>Password:</label>
        <input type="text" name="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
