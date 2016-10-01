import { select, put } from 'redux-saga/effects';
import { actionForKeySelector } from './selectors';

export default function *inputSaga(event) {
  const nextAction = yield select(actionForKeySelector, event.code);
  if(nextAction) {
    yield put(nextAction);
  }
}
