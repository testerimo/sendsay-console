import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { setRequest } from 'redux/modules/request';
import { unselectTrack } from 'redux/modules/tracks';
import { stringify } from 'utils/json';

import { Field, Split } from 'components/Common';

import './RequestResponse.css';

function RequestResponse({
  className,
  currentTrack,
  request,
  response,
  isRequestInvalid,
  isResponseInvalid,
  setRequest,
  unselectTrack,
}) {
  const requestResponseClassName = cn('requestResponse', className);

  const handleFieldChange = (event) => {
    setRequest(event.target.value);

    if (currentTrack) {
      unselectTrack(currentTrack.id);
    }
  };

  return (
    <div className={requestResponseClassName}>
      <Split className="requestResponse__split">
        <Field
          className="requestResponse__editor"
          component="textarea"
          name="request"
          label="Запрос:"
          value={request}
          invalid={isRequestInvalid}
          onChange={handleFieldChange}
        />

        <Field
          className="requestResponse__editor"
          component="textarea"
          name="response"
          label="Ответ:"
          value={response}
          invalid={isResponseInvalid}
          disabled
        />
      </Split>
    </div>
  );
}

function mapStateToProps({ request, response, tracks: { current } }) {
  return {
    currentTrack: current,
    request: current ? stringify(current.request) : request.value,
    response: current ? stringify(current.response || current.error): response.value,
    isRequestInvalid: request.isInvalid,
    isResponseInvalid: response.isError,
  };
}

const mapDispatchToProps = {
  setRequest,
  unselectTrack,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestResponse);
