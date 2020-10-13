import React from 'react';
import cn from 'classnames';

import './Spinner.css';

export default function Spinner({ className }) {
  const spinnerClassName = cn('spinner', className);

  return (
    <div className={spinnerClassName}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
