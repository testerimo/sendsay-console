import React from 'react';

import Button from './Button';
import Spinner from '../Spinner';
import {
  Logout,
  FullScreen,
  NormalScreen,
  Format,
  Clear,
  Dots
} from '../Icons';

export const LoginButton = React.memo(function LoginButton({ disabled, loading }) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      startIcon={loading && <Spinner />}
    >
      {!loading && 'Войти'}
    </Button>
  );
});

export function LogoutButton({ className, logout }) {
  return (
    <Button
      className={className}
      onClick={logout}
      endIcon={<Logout />}
    >
      Выйти
    </Button>
  );
}

export function FullScreenButton({ className, isFullScreen, toggleFullScreen }) {
  return (
    <Button
      className={className}
      onClick={toggleFullScreen}
      startIcon={isFullScreen
        ? <NormalScreen />
        : <FullScreen />
      }
    />
  );
}

export function ClearHistoryButton({ className, clear }) {
  return (
    <Button
      className={className}
      onClick={clear}
      startIcon={<Clear />}
    />
  );
};

export const OptionsButton = React.forwardRef(function OptionsButton({ className, toggleOptions }, ref) {
  return (
    <Button
      ref={ref}
      className={className}
      onClick={toggleOptions}
      startIcon={<Dots />}
    />
  );
});

export function ResizeRequestResponseButton({ className, resize }) {
  return (
    <Button
      className={className}
      onClick={resize}
      startIcon={<Dots />}
    />
  );
}

export function SendRequestButton({ send, disabled, loading }) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={send}
      startIcon={loading && <Spinner />}
    >
      {!loading && 'Отправить'}
    </Button>
  );
}

export const FormatRequestButton = React.memo(function FormatRequestButton({ className, format }) {
  return (
    <Button
      className={className}
      onClick={format}
      startIcon={<Format />}
    >
      Форматировать
    </Button>
  );
});
