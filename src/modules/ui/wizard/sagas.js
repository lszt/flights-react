import { takeEvery } from 'redux-saga';
import { put, fork } from 'redux-saga/effects'
import { destroy } from 'redux-form';
import { push } from 'react-router-redux'
import {
  INIT_NEW_DEPARTURE,
  INIT_NEW_DEPARTURE_FROM_ARRIVAL,
  EDIT_DEPARTURE,
  SAVE_DEPARTURE_SUCCESS
} from '../../movements/departures';
import {
  INIT_NEW_ARRIVAL,
  INIT_NEW_ARRIVAL_FROM_DEPARTURE,
  EDIT_ARRIVAL,
  SAVE_ARRIVAL_SUCCESS
} from '../../movements/arrivals';
import * as actions from './actions';

export function* init() {
  yield put(actions.reset());
}

export function* setCommitted(action) {
  yield put(actions.setCommitted(action.payload.key, action.payload.values));
}

export function* finish() {
  yield put(push('/'));
  yield put(actions.reset());
}

export default function* sagas() {
  yield [
    fork(takeEvery, INIT_NEW_DEPARTURE, init),
    fork(takeEvery, INIT_NEW_DEPARTURE_FROM_ARRIVAL, init),
    fork(takeEvery, INIT_NEW_ARRIVAL, init),
    fork(takeEvery, INIT_NEW_ARRIVAL_FROM_DEPARTURE, init),
    fork(takeEvery, EDIT_DEPARTURE, init),
    fork(takeEvery, EDIT_ARRIVAL, init),
    fork(takeEvery, SAVE_DEPARTURE_SUCCESS, setCommitted),
    fork(takeEvery, SAVE_ARRIVAL_SUCCESS, setCommitted),
    fork(takeEvery, actions.WIZARD_FINISH, finish),
  ]
}
