import React from 'react';
import MovementWizard from '../MovementWizard';
import AircraftPage from '../pages/AircraftPage';
import PilotPage from '../pages/PilotPage';
import PassengerPage from './pages/PassengerPage';
import DepartureArrivalPage from './pages/DepartureArrivalPage';
import FlightPage from '../../../containers/ArrivalFlightPageContainer';
import Finish from '../../../containers/ArrivalFinishContainer';

const pages = [
  {
    component: AircraftPage,
    label: 'Flugzeugdaten',
  },
  {
    component: PilotPage,
    label: 'Pilot',
  },
  {
    component: PassengerPage,
    label: 'Passagiere',
  },
  {
    component: DepartureArrivalPage,
    label: 'Start und Ziel',
  },
  {
    component: FlightPage,
    label: 'Flug',
  },
];

const ArrivalWizard = props => (
  <MovementWizard
    {...props}
    initMovement={props.params.departureKey ? props.initNewArrivalFromDeparture.bind(null, props.params.departureKey) : null}
    pages={pages}
    className="ArrivalWizard"
    finishComponentClass={Finish}
    newMovementLabel="Neue Ankunft"
    updateMovementLabel="Ankunft bearbeiten"
  />
);

ArrivalWizard.propTypes = {
  wizard: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  initNewMovement: React.PropTypes.func.isRequired,
  initNewArrivalFromDeparture: React.PropTypes.func.isRequired,
  editMovement: React.PropTypes.func.isRequired,
  nextPage: React.PropTypes.func.isRequired,
  previousPage: React.PropTypes.func.isRequired,
  finish: React.PropTypes.func.isRequired,
  saveMovement: React.PropTypes.func.isRequired,
  unsetCommitError: React.PropTypes.func.isRequired,
  destroyForm: React.PropTypes.func.isRequired,
};

ArrivalWizard.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ArrivalWizard;