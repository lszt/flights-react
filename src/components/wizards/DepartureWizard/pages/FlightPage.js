import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../validate';
import { renderSingleSelect, renderTextArea } from '../../renderField';

const FlightPage = (props) => {
  const { previousPage, handleSubmit, flightTypes, runways, departureRoutes } = props;
  return (
    <form onSubmit={handleSubmit} className="FlightPage">
      <fieldset>
        <legend>Flug</legend>
        <Field
          name="flightType"
          component={renderSingleSelect}
          items={flightTypes}
          orientation="vertical"
          parse={e => e.target.value}
          label="Typ"
        />
        <Field
          name="runway"
          component={renderSingleSelect}
          items={runways}
          parse={e => e.target.value}
          label="Pistenrichtung"
        />
        <Field
          name="departureRoute"
          component={renderSingleSelect}
          items={departureRoutes}
          orientation="vertical"
          parse={e => e.target.value}
          label="Abflugroute"
        />
        <Field
          name="route"
          component={renderTextArea}
          label="Routing"
        />
        <Field
          name="remarks"
          component={renderTextArea}
          label="Bemerkungen"
        />
      </fieldset>
      <div className="WizardNavigation">
        <button type="button" className="previous" onClick={previousPage}>Zurück</button>
        <button type="submit" className="next">Speichern</button>
      </div>
    </form>
  );
};

FlightPage.propTypes = {
  previousPage: PropTypes.func,
  handleSubmit: PropTypes.func,
  flightTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  runways: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  departureRoutes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate: validate('departure', ['flightType', 'runway', 'departureRoute', 'route', 'remarks']),
})(FlightPage);
