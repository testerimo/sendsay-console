import React, { useRef, useEffect } from 'react';
import cn from 'classnames';

import './Dropdown.css';

function Dropdown({ align, actionElement, isShown, children }) {
  const dropdownRef = useRef(null);

  const setDropdownPosition = () => {
    const dropdownElement = dropdownRef.current;
    const actionElementRect = actionElement.getBoundingClientRect();
    const dropdownElementRect = dropdownElement.getBoundingClientRect();

    const windowRight = document.documentElement.clientWidth;
    const windowBottom = window.pageYOffset + document.documentElement.clientHeight;

    const top = windowBottom < dropdownElementRect.bottom
      ? actionElementRect.top - dropdownElementRect.height
      : actionElementRect.bottom;

    let left = align === 'right'
      ? actionElementRect.right - dropdownElementRect.width
      : actionElementRect.left;

    if (left < 0) {
      left = 0;
    } else if (left > windowRight - dropdownElementRect.width) {
      left = windowRight - dropdownElementRect.width;
    }

    dropdownElement.style.left = left + 'px';
    dropdownElement.style.top = top + 'px';
    dropdownElement.style.visibility = 'visible';
  };

  useEffect(() => {
    if (isShown) {
      setDropdownPosition();
    }
  });

  if (!isShown) {
    return null;
  }

  return (
    <ul className="dropdown" ref={dropdownRef}>
      {children}
    </ul>
  );
}


function Option({ variant, onClick, children }) {
  const optionClassNames = cn('dropdown__option', variant && `dropdown__option--variant-${variant}`);
  return (
    <li
      className={optionClassNames}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

function Divider() {
  return (
    <div className="dropdown__divider" />
  );
}

Dropdown.Option = Option;
Dropdown.Divider = Divider;

export default Dropdown;
