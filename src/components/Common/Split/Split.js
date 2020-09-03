import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { getSplitSizes, setSplitSizes } from 'services/storage';

import { default as SplitController } from 'react-split';
import { Dots } from '../Icons';

import './Split.css';

function createGutter() {
  const gutter = document.createElement('div');
  gutter.className = 'split__gutter';

  ReactDOM.render(<Dots className="split__icon"/>, gutter);

  return gutter;
}

export default function Split({ className, minSize, children }) {
  const splitClassName = cn('split', className);
  const actualSizes = getSplitSizes();

  return (
    <SplitController
      className={splitClassName}
      sizes={actualSizes}
      minSize={minSize}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={15}
      dragInterval={1}
      gutter={createGutter}
      onDragEnd={setSplitSizes}
    >
      {children}
    </SplitController>
  );
}

Split.defaultProps = {
  minSize: 280,
};
