import React from 'react';
import cn from 'classnames';
import { stringify } from 'utils/json';

import './Alert.css';

function Alert({ className, title, message }) {
  if (!message) {
    return null;
  }

  const alertClassName = cn('alert', className);
  const details = stringify(message, null, ' ');

  return (
    <div className={alertClassName}>
      {title && <h3 className="alert__title">{title}</h3>}
      {details && <div className="alert__details">{details}</div>}
    </div>
  );
};

export default React.memo(Alert);
