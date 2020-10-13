import { stringify } from 'utils/json';

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setItem(key, value) {
  const serializedValue = stringify(value);
  localStorage.setItem(key, serializedValue);
}

export function getHistory() {
  return getItem('track_history') || [];
}

export function setHistory(newHistory) {
  setItem('track_history', newHistory);
}

export function getSplitSizes() {
  return getItem('split_sizes') || [50, 50];
}

export function setSplitSizes(newSizes) {
  setItem('split_sizes', newSizes);
}
