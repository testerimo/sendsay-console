import Sendsay from 'sendsay-api';

const sessionKey = 'sendsay_session';
const withSubloginKey = 'with_sublogin';

const initialOptions = {
  'max-age': 60 * 60 * 24,
};

function getCookie(name) {
  return (document.cookie.match(`(^|; )${name}=([^;]*)`) || 0)[2];
}

function setCookie(name, value, options = {}) {
  const cookieValue = `${name}=${value}`;
  const cookieOptions = Object.entries(options).map(([key, value]) => `${key}=${value}`);

  const cookieValues = [
    cookieValue,
    ...cookieOptions,
  ];

  document.cookie = cookieValues.join(';');
}

export default class SendsayService {
  constructor(options = initialOptions) {
    this.options = options;
    this.sendsay = new Sendsay();
    this.sendsay.onError(this.errorHandler);
  }

  initSession = () => {
    setCookie(sessionKey, this.sendsay.session, this.options);
    setCookie(withSubloginKey, this.withSublogin, this.options);
  }

  restoreSession = () => {
    this.sendsay.setSessionFromCookie(sessionKey);

    if (this.sendsay.session) {
      this.withSublogin = getCookie(withSubloginKey) === 'true';
    }
  }

  endSession = () => {
    const options = {
      'max-age': -1,
    };

    setCookie(sessionKey, '', options);
    setCookie(withSubloginKey, '', options);
  }

  authenticate = async () => {
    this.restoreSession();
    return await this.getUser();
  }

  login = async (credentials) => {
    this.withSublogin = Boolean(credentials.sublogin);

    await this.sendsay.login(credentials);
    this.initSession();

    return await this.getUser();
  }

  logout = async () => {
    await this.request({ action: 'logout' });
    this.endSession();
  }

  getUser = async () => {
    const user = {};

    const { account, sublogin } = await this.sendsay.request({ action: 'pong' });

    user.login = account;
    user.sublogin = this.withSublogin ? sublogin : null;

    return user;
  }

  request = async (body) => {
    return this.sendsay.request(body);
  }

  errorHandler = (error) => {
    delete error.request;
    return error;
  }
}

