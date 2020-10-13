import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { session } from 'redux/modules/auth';

import Login from '../Login';
import Console from '../Console';

import './App.css';
import './variables.css';

function App({ isSessionRequesting, isAuthenticated, session }) {
  useEffect(() => {
    session();
  });

  return isSessionRequesting
    ? null
    : isAuthenticated
      ? <Console />
      : <Login />;
}

function mapStateToProps({ auth: { isSessionRequesting, isAuthenticated } }) {
  return {
    isSessionRequesting,
    isAuthenticated,
  };
}

const mapDispatchToProps = {
  session,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
