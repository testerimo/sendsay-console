import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';

import HistoryListItem from './Item';

function HistoryList({ history }) {
  const listRef = useRef(null);
  const [dropdownIdShown, setDropdownIdShown] = useState(null);

  const toggleDropdown = useCallback((newId) => {
    setDropdownIdShown(prevId => prevId === newId ? null : newId);
  }, [setDropdownIdShown]);

  const closeDropdownHandler = (event) => {
    if (!event.target.closest('.track__options')) {
      toggleDropdown(null);
    }
  };

  useEffect(() => {
    const currentListElement = listRef.current;

    document.addEventListener('click', closeDropdownHandler);
    currentListElement.addEventListener('scroll', closeDropdownHandler)

    return () => {
      document.removeEventListener('click', closeDropdownHandler);
      currentListElement.removeEventListener('scroll', closeDropdownHandler)
    }
  });

  return (
    <ul className="history__list" ref={listRef}>
      {history.map((track) => (
        <HistoryListItem
          key={track.id}
          track={track}
          isDropdownShown={dropdownIdShown === track.id}
          toggleDropdown={toggleDropdown}
        />
      ))}
    </ul>
  );
}

function mapStateToProps({ tracks: { history } }) {
  return {
    history,
  };
}

export default connect(mapStateToProps)(HistoryList);
