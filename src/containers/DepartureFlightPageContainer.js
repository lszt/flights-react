import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import FlightPage from '../components/wizards/DepartureWizard/pages/FlightPage';

const flightTypes = [
  {
    label: 'Privat',
    value: 'private',
  }, {
    label: 'Gewerblich',
    value: 'commercial',
  }, {
    label: 'Schulung',
    value: 'instruction',
  },
];

const runways = [
  {
    label: '06',
    value: '06',
  }, {
    label: '24',
    value: '24',
  },
];

const departureRoutes = [
  {
    label: 'Sektor Süd',
    value: 'south',
  }, {
    label: 'Matzingen',
    value: 'matzingen',
  }, {
    label: 'Platzrunden',
    value: 'circuits',
    description: 'Ohne Verlassen des Platzverkehrs',
    available: values => values.location.toUpperCase() === 'LSZT',
  },
];

const filter = (items, values) => items.filter(item => !item.available || item.available(values) === true);

const mapStateToProps = (state, ownProps) => {
  const values = getFormValues('wizard')(state);
  return Object.assign({}, ownProps, {
    flightTypes: filter(flightTypes, values),
    runways: filter(runways, values),
    departureRoutes: filter(departureRoutes, values),
  });
};

const mapActionCreators = {
};

export default connect(mapStateToProps, mapActionCreators)(FlightPage);