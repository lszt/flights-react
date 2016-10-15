import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects'
import * as actions from './actions';
import createChannel, { monitor } from '../../../util/createChannel';
import * as sharedSagas from '../shared/sagas';

function* loadArrivals(channel) {
  yield sharedSagas.loadMovements(
    actions.setArrivalsLoading,
    state => state.movements.arrivals,
    '/arrivals',
    channel,
    actions.arrivalsAdded
  );
}

function* deleteArrival(action) {
  yield sharedSagas.deleteMovement('/arrivals', action.payload.key, action.payload.successAction);
}

export default function* sagas() {
  const channel = createChannel();

  yield [
    fork(monitor, channel),
    fork(takeEvery, actions.LOAD_ARRIVALS, loadArrivals, channel),
    fork(takeEvery, actions.DELETE_ARRIVAL, deleteArrival),
  ]
}