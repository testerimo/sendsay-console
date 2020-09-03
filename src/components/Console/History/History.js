import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { clearTracks } from 'redux/modules/tracks';

import HistoryList from './List';
import { ClearHistoryButton } from 'components/Common';

import './History.css';

function History({ className, clearTracks }) {
  const historyClassName = cn('history', className);

  return (
    <div className={historyClassName}>
      <HistoryList />

      <div className="history__clear">
        <ClearHistoryButton clear={clearTracks} />
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  clearTracks,
};

export default connect(null, mapDispatchToProps)(History);
