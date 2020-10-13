import React from 'react';

export default function Logo({ className, size }) {
  return (
    <svg
      className={className}
      width={Math.ceil(size * 3.833)}
      height={size}
      viewBox="0 0 115 30"
      fill="#000"
      opacity="0.2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" />
      <circle cx="70" cy="15" r="15" />
      <rect x="35" width="15" height="30" />
      <path d="M100 0H115L100 30H85L100 0Z" />
    </svg>
  );
}

Logo.defaultProps = {
  size: '30',
};
