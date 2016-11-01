export const LOAD_DEPARTURES = 'LOAD_DEPARTURES';
export const SET_DEPARTURES_LOADING = 'SET_DEPARTURES_LOADING';
export const DEPARTURES_ADDED = 'DEPARTURES_ADDED';
export const DELETE_DEPARTURE = 'DELETE_DEPARTURE';
export const INIT_NEW_DEPARTURE = 'INIT_NEW_DEPARTURE';
export const INIT_NEW_DEPARTURE_FROM_ARRIVAL = 'INIT_NEW_DEPARTURE_FROM_ARRIVAL';
export const SAVE_DEPARTURE = 'SAVE_DEPARTURE';
export const SAVE_DEPARTURE_SUCCESS = 'SAVE_DEPARTURE_SUCCESS';
export const EDIT_DEPARTURE = 'EDIT_DEPARTURE';

export function loadDepartures() {
  return {
    type: LOAD_DEPARTURES,
  };
}

export function setDeparturesLoading() {
  return {
    type: SET_DEPARTURES_LOADING,
  };
}

export function departuresAdded(snapshot) {
  return {
    type: DEPARTURES_ADDED,
    payload: {
      snapshot,
    },
  };
}

export function deleteDeparture(key, successAction) {
  return {
    type: DELETE_DEPARTURE,
    payload: {
      key,
      successAction,
    },
  };
}

export function initNewDeparture() {
  return {
    type: INIT_NEW_DEPARTURE,
  };
}

export function initNewDepartureFromArrival(arrivalKey) {
  return {
    type: INIT_NEW_DEPARTURE_FROM_ARRIVAL,
    payload: {
      arrivalKey,
    },
  };
}

export function saveDeparture() {
  return {
    type: SAVE_DEPARTURE,
  };
}

export function saveDepartureSuccess(key, values) {
  return {
    type: SAVE_DEPARTURE_SUCCESS,
    payload: {
      key,
      values,
    },
  };
}

export function editDeparture(key) {
  return {
    type: EDIT_DEPARTURE,
    payload: {
      key,
    },
  };
}
