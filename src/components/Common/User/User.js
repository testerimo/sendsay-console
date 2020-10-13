import React from 'react';
import cn from 'classnames';

import './User.css';

export default function User({ className, login, sublogin }) {
  const userClassName = cn('user', className);

  return (
    <div className={userClassName}>
      {login}
      {sublogin && <span className="user__divider">:</span>}
      {sublogin}
    </div>
  );
}
