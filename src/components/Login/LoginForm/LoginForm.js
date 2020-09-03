import React from 'react';
import { connect } from 'react-redux';
import { login } from 'redux/modules/auth';
import { isLoginCorrect, isSubloginCorrect, isPasswordCorrect } from 'services/validation';

import { Alert, Form, Field, LoginButton } from 'components/Common';

import './LoginForm.css';

const initialValues = {
  login: '',
  sublogin: '',
  password: '',
};

const validation = {
  login: isLoginCorrect,
  sublogin: isSubloginCorrect,
  password: isPasswordCorrect,
};

function LoginForm({ login, error, isLoginRequesting}) {
  return (
    <Form
      initialValues={initialValues}
      validation={validation}
      onSubmit={login}
    >
      {
        ({
          values,
          errors,
          touched,
          isDisabled,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
            <form
              className="loginForm"
              onSubmit={handleSubmit}
            >
              <h2 className="loginForm__title">
                API-консолька
              </h2>

              <Alert
                className="loginForm__alert"
                title="Вход не вышел"
                message={error}
              />

              <Field
                className="loginForm__field"
                name="login"
                label="Логин"
                value={values.login}
                invalid={errors.login && touched.login}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Field
                className="loginForm__field"
                name="sublogin"
                label="Сублогин"
                value={values.sublogin}
                invalid={errors.sublogin && touched.sublogin}
                onChange={handleChange}
                onBlur={handleBlur}
                optional
              />

              <Field
                className="loginForm__field"
                type="password"
                name="password"
                label="Пароль"
                value={values.password}
                invalid={errors.password && touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <LoginButton
                disabled={isDisabled}
                loading={isLoginRequesting}
              />
            </form>
          )
      }
    </Form>
  );
}

function mapStateToProps({ auth: { error, isLoginRequesting } }) {
  return {
    error,
    isLoginRequesting,
  };
}

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
