import React, { useState } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { clearTracks } from 'redux/modules/tracks';
import { toggleFullScreen } from 'utils/fullscreen';

import { Logo, User, LogoutButton, FullScreenButton } from 'components/Common'

import './Header.css';

function Header({ className, user, logout, clearTracks }) {
  const headerClassName = cn('header', className);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(isFullScreen => !isFullScreen);
    toggleFullScreen();
  };

  const handleLogout = () => {
    clearTracks();
    logout();
  };

  return (
    <div className={headerClassName}>
      <Logo className="header__logo" />

      <h2 className="header__title">
        API-консолька
      </h2>

      <User
        className="header__user"
        login={user.login}
        sublogin={user.sublogin}
      />

      <LogoutButton
        className="header__logout"
        logout={handleLogout}
      />

      <FullScreenButton
        className="header__fullScreen"
        isFullScreen={isFullScreen}
        toggleFullScreen={handleFullScreen}
      />
    </div>
  );
}

function mapStateToProps({ auth: { user } }) {
  return {
    user,
  };
}

const mapDispatchToProps = {
  logout,
  clearTracks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
