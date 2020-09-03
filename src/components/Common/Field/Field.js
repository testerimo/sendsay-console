import React from 'react';
import cn from 'classnames';

import './Field.css';

function Field({
  className,
  component,
  name,
  label,
  invalid,
  optional,
  ...rest
}) {
  const fieldClassName = cn('field', className, { 'field--invalid': invalid });

  const field = React.createElement(component, {
    className: `field__${component}`,
    name,
    ...rest,
  });

  return (
    <div className={fieldClassName}>
      <div className="field__label">
        <label htmlFor={name}>{label}</label>
        {optional && <span className="field__optional">Опционально</span>}
      </div>

      {field}
    </div>
  );
}

const WrappedField = React.memo(Field);

WrappedField.defaultProps = {
  type: 'text',
  component: 'input',
  disabled: false,
};

export default WrappedField;
