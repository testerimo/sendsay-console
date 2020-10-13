import React from 'react';
import cn from 'classnames';

import './Button.css';

function Button({
  className,
  type,
  variant,
  disabled,
  onClick,
  startIcon,
  endIcon,
  children,
}, ref) {
  const variantClassNames = {
    text: 'button--variant-text',
    contained: 'button--variant-contained',
  };

  const buttonClassName = cn('button', variantClassNames[variant], className);

  const renderIcon = (icon, position) => {
    if (!icon) {
      return null;
    }

    const iconPositionClassNames = {
      start: 'button__icon--position-start',
      end: 'button__icon--position-end',
    };

    const iconPositionClassName = children
      ? iconPositionClassNames[position]
      : null;

    const iconClassName = cn(
      'button__icon',
      iconPositionClassName,
      icon.props.className,
    );

    return React.cloneElement(icon, { className: iconClassName });
  };

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {renderIcon(startIcon, 'start')}
      {children && <span className="button__label">{children}</span>}
      {renderIcon(endIcon, 'end')}
    </button>
  );
};

const WrappedButton = React.memo(React.forwardRef(Button));

WrappedButton.defaultProps = {
  type: 'button',
  variant: 'text',
};

export default WrappedButton;
