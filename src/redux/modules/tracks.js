import { setRequest } from './request';
import { setResponse } from './response';
import { getHistory } from 'services/storage';
import { identifier } from 'utils/identifier';
import { parse } from 'utils/json';

function trackSelected(id) {
  return {
    type: 'tracks/selectTrack',
    payload: id,
  };
}

export function addTrack(track) {
  return {
    type: 'tracks/addTrack',
    payload: track,
  };
}

export function deleteTrack(id) {
  return {
    type: 'tracks/deleteTrack',
    payload: id,
  };
}

export function clearTracks() {
  return {
    type: 'tracks/clearTracks',
  };
}

export function selectTrack(id) {
  return (dispatch, getState) => {
    dispatch(trackSelected(id));

    const { request, response, error, isError } = getState().tracks.current;

    dispatch(setRequest(request));
    dispatch(setResponse(response || error, isError));
  }
}

export function selectLastTrack() {
  return (dispatch, getState) => {
    const lastId = getState().tracks.history[0].id;
    dispatch(trackSelected(lastId));
  };
}

export function unselectTrack() {
  return {
    type: 'tracks/unselectTrack',
  };
}

const maxHistoryLength = 20;

const initialState = {
  current: null,
  history: getHistory(),
};

export default function tracks(prevState = initialState, action) {
  const { history } = prevState;

  switch (action.type) {
    case 'tracks/selectTrack':
      return {
        ...prevState,
        current: history.find((track) => track.id === action.payload) || null,
      };
    case 'tracks/unselectTrack':
      return {
        ...prevState,
        current: null,
      };
    case 'tracks/addTrack':
      let { request, response = null, error = null } = action.payload;

      const newTrack = {
        id: identifier(),
        actionName: request.action || 'null',
        request: parse(request),
        response,
        error,
        isError: Boolean(error),
      };

      const newHistory = [
        newTrack,
        ...history.filter((track) => track.actionName !== newTrack.actionName),
      ];

      if (newHistory.length > maxHistoryLength) {
        newHistory.length = maxHistoryLength;
      }

      return {
        ...prevState,
        history: newHistory,
      };
    case 'tracks/deleteTrack':
      return {
        ...prevState,
        history: history.filter((track) => track.id !== action.payload),
      };
    case 'tracks/clearTracks':
      return {
        ...prevState,
        history: [],
      };
    default:
      return prevState;
  }
}

