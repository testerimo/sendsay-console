import { stringify } from 'utils/json';

export function setResponse(value, isError = false) {
  return {
    type: 'response/setResponse',
    payload: {
      value,
      isError,
    },
  };
}

const initialState = {
  value: '',
  isError: false,
};

export default function response(prevState = initialState, action) {
  switch (action.type) {
    case 'response/setResponse':
      let { value, isError } = action.payload;

      return {
        value: stringify(value),
        isError,
      };
    default:
      return prevState;
  }
}
