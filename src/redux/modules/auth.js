function loginRequest() {
  return {
    type: 'auth/loginRequest',
  };
}

function loginSuccess(user) {
  return {
    type: 'auth/loginSuccess',
    payload: user,
  };
}

function loginError(error) {
  return {
    type: 'auth/loginFailure',
    payload: error,
  };
}

function logoutSuccess() {
  return {
    type: 'auth/logoutSuccess',
  }
}

export function session() {
  return (dispatch, _, sendsayService) => {
    sendsayService.authenticate()
      .then((user) => dispatch(loginSuccess(user)))
      .catch(() => dispatch(loginError()));
  };
}

export function login(credentials) {
  return (dispatch, _, sendsayService) => {
    dispatch(loginRequest());
    sendsayService.login(credentials)
      .then((user) => dispatch(loginSuccess(user)))
      .catch((error) => dispatch(loginError(error)));
  }
}

export function logout() {
  return (dispatch, _, sendsayService) => {
    sendsayService.logout()
      .then(() => dispatch(logoutSuccess()));
  }
}

const initialState = {
  isSessionRequesting: true,
  isLoginRequesting: false,
  isAuthenticating: true,
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function auth(prevState = initialState, action) {
  switch (action.type) {
    case 'auth/loginRequest':
      return {
        ...prevState,
        isLoginRequesting: true,
        isAuthenticating: true,
        isAuthenticated: false,
      };
    case 'auth/loginSuccess':
      return {
        isSessionRequesting: false,
        isLoginRequesting: false,
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'auth/loginFailure':
      return {
        isSessionRequesting: false,
        isLoginRequesting: false,
        isAuthenticating: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'auth/logoutSuccess':
      return {
        ...initialState,
        isSessionRequesting: false,
        isAuthenticating: false,
      }
    default:
      return prevState;
  }
}

