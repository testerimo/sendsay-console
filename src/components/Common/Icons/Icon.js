import React from 'react';

const noColor = 'none';
const defaultColor = '#0d0d0d';
const defaultOpacity = '0.8';

export default function Icon({ className, size, viewBox, children: path }) {
  if (!path) {
    return null;
  }

  const [x, y, w, h] = viewBox.split(' ');
  const r = (w - x) / (h - y);
  const width = Math.round(size * r);

  return (
    <svg
      className={className}
      width={width}
      height={size}
      viewBox={viewBox}
      fill={noColor}
      stroke={defaultColor}
      opacity={defaultOpacity}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {path}
    </svg>
  );
};

Icon.defaultProps = {
  size: '24',
  viewBox: '0 0 24 24',
};

export function createIcon(path, props) {
  return function Component(rest) {
    return (
      <Icon {...props} {...rest}>
        {path}
      </Icon>
    );
  }
}
