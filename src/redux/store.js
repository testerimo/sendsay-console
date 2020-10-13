import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules/reducer';
import SendsayService from 'services/sendsay';
import { setHistory } from 'services/storage';

const sendsayService = new SendsayService()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(sendsayService)),
  ),
);

let currentHistory = null;

store.subscribe(() => {
  const newHistory = store.getState().tracks.history;

  if (currentHistory !== newHistory) {
    setHistory(newHistory);
  }
});

export default store;
