import * as actions from './actions';
import reducer from '../../../util/reducer';

const INITIAL_STATE = {
  page: 1,
  showCommitRequirementsDialog: false,
  committed: false,
};

function nextPage(state) {
  return Object.assign({}, state, {
    page: state.page + 1,
  });
}

function previousPage(state) {
  return Object.assign({}, state, {
    page: state.page > 1 ? state.page - 1 : 1,
  });
}

function reset() {
  return INITIAL_STATE;
}

function showCommitRequirementsDialog(state) {
  return Object.assign({}, state, {
    showCommitRequirementsDialog: true,
  });
}

function hideCommitRequirementsDialog(state) {
  return Object.assign({}, state, {
    showCommitRequirementsDialog: false,
  });
}

function setCommitted(state) {
  return Object.assign({}, state, {
    committed: true,
  });
}

const ACTION_HANDLERS = {
  [actions.WIZARD_NEXT_PAGE]: nextPage,
  [actions.WIZARD_PREVIOUS_PAGE]: previousPage,
  [actions.WIZARD_RESET]: reset,
  [actions.WIZARD_SHOW_COMMIT_REQUIREMENTS_DIALOG]: showCommitRequirementsDialog,
  [actions.WIZARD_HIDE_COMMIT_REQUIREMENTS_DIALOG]: hideCommitRequirementsDialog,
  [actions.WIZARD_SET_COMMITTED]: setCommitted,
};

export default reducer(INITIAL_STATE, ACTION_HANDLERS);