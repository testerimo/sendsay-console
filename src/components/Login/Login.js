import React from 'react';

import LoginForm from './LoginForm';
import { Logo, GitHubLink } from '../Common';

import './Login.css';

export default function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <Logo className="login__logo" />

        <LoginForm />

        <GitHubLink
          className="login__gitHubLink"
          login="testerimo"
        />
      </div>
    </div>
  );
}
