import React, { useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setResponse } from 'redux/modules/response';
import { setRequest, sendRequest } from 'redux/modules/request';
import { selectTrack, selectLastTrack, deleteTrack } from 'redux/modules/tracks';
import { copyToClipboard } from 'utils/clipboard';
import { stringify } from 'utils/json';

import { Track, Dropdown } from 'components/Common';

function HistoryListItem({
  track,
  toggleDropdown,
  isDropdownShown,
  selectTrack,
  selectLastTrack,
  deleteTrack,
  setRequest,
  sendRequest,
  setResponse,
}) {
  const { id, request, actionName, isError } = track;
  const requestValue = stringify(request);

  const trackRef = useRef(null);
  const optionsRef = useRef(null)

  const showCopiedNotification = () => {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('history__track--notification-copied');
    notificationElement.textContent = 'Скопировано';

    trackRef.current.append(notificationElement);

    setTimeout(() => {
      notificationElement.remove();
    }, 800);
  };

  const copyTrack = () => {
    copyToClipboard(requestValue);
    showCopiedNotification();
  };

  const executeTrack = () => {
    setRequest(requestValue);
    setResponse(null);
    sendRequest().then(selectLastTrack);
  };

  const deleteFromHistory = () => {
    deleteTrack(id);
  };

  return (
    <li className="history__item">
      <Track
        id={id}
        ref={{ trackRef, optionsRef }}
        className="history__track"
        actionName={actionName}
        isError={isError}
        onClick={selectTrack}
        onOptionsClick={toggleDropdown}
      />

      <Dropdown
        align="right"
        actionElement={optionsRef.current}
        isShown={isDropdownShown}
      >
        <Dropdown.Option onClick={executeTrack}>Выполнить</Dropdown.Option>
        <Dropdown.Option onClick={copyTrack}>Скопировать</Dropdown.Option>
        <Dropdown.Divider />
        <Dropdown.Option variant="destructive" onClick={deleteFromHistory}>Удалить</Dropdown.Option>
      </Dropdown>
    </li>
  );
}

const mapDispatchToProps = {
  selectTrack,
  selectLastTrack,
  deleteTrack,
  setRequest,
  setResponse,
  sendRequest,
};

export default compose(
  React.memo,
  connect(null, mapDispatchToProps),
)(HistoryListItem);
