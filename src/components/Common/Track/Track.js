import React from 'react';
import cn from 'classnames';

import { OptionsButton } from '../Buttons';

import './Track.css';

function Track({ id, className, actionName, isError, onClick, onOptionsClick }, ref) {
  const { trackRef, optionsRef } = ref;
  const trackClassName = cn('track', className);
  const statusClassName = cn('track__status', {
    'track__status--success': !isError,
    'track__status--fail': isError,
  });

  return (
    <div ref={trackRef} className={trackClassName} onClick={() => onClick(id)}>
      <span className={statusClassName} />
      <span className="track__action">{actionName}</span>
      <OptionsButton
        className="track__options"
        ref={optionsRef}
        toggleOptions={(event) => {
          onOptionsClick(id);
          event.stopPropagation();
        }}
      />
    </div>
  );
}

export default React.forwardRef(Track);
