import { setResponse } from './response';
import { addTrack, selectLastTrack } from './tracks';
import { parse, format, stringify } from 'utils/json';

function requestSended() {
  return {
    type: 'request/sendRequest',
  };
}

function requestCompleted() {
  return {
    type: 'request/completeRequest',
  };
}

export function setRequest(value) {
  return {
    type: 'request/setRequest',
    payload: value,
  };
}

export function formatRequest() {
  return {
    type: 'request/formatRequest',
  };
}

export function invalidRequest() {
  return {
    type: 'request/invalidRequest',
  };
}

export function sendRequest() {
  return (dispatch, getState, sendsayService) => {
    const { value } = getState().request;
    const request = parse(value);

    if (!request) {
      return dispatch(invalidRequest());
    }

    dispatch(requestSended());

    return sendsayService.request(request)
      .then((response) => {
        dispatch(setResponse(response));
        dispatch(addTrack({ request, response }));
      })
      .catch((error) => {
        dispatch(setResponse(error, true));
        dispatch(addTrack({ request, error }));
      })
      .then(() => {
        dispatch(requestCompleted());
        dispatch(selectLastTrack());
      });
  };
};

const initialState = {
  value: '',
  isInvalid: false,
  isRequesting: false,
  isRequested: false,
};

export default function request(prevState = initialState, action) {
  switch (action.type) {
    case 'request/setRequest':
      return {
        ...initialState,
        value: stringify(action.payload),
        isInvalid: false,
      };
    case 'request/formatRequest': {
      let newValue = format(prevState.value);
      const isInvalid = newValue === null;

      if (isInvalid) {
        newValue = prevState.value;
      }

      return {
        ...prevState,
        value: newValue,
        isInvalid,
      };
    }
    case 'request/invalidRequest':
      return {
        ...prevState,
        isInvalid: true,
      }
    case 'request/sendRequest':
      return {
        ...prevState,
        isInvalid: false,
        isRequesting: true,
        isRequested: false,
      };
    case 'request/completeRequest':
      return {
        ...prevState,
        isRequesting: false,
        isRequsted: true,
      };
    default:
      return prevState;
  }
}
