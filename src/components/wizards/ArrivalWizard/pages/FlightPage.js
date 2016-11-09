import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../validate';
import { renderSingleSelect, renderTextArea } from '../../renderField';

const FlightPage = (props) => {
  const { previousPage, handleSubmit, flightTypes, arrivalRoutes, runways } = props;
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
          name="arrivalRoute"
          component={renderSingleSelect}
          items={arrivalRoutes}
          orientation="vertical"
          parse={e => e.target.value}
          label="Ankunftsroute"
        />
        <Field
          name="remarks"
          component={renderTextArea}
          label="Bemerkungen"
        />
        <Field
          name="runway"
          component={renderSingleSelect}
          items={runways}
          parse={e => e.target.value}
          label="Pistenrichtung"
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
  previousPage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  flightTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  runways: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  arrivalRoutes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate: validate('arrival', ['flightType', 'arrivalRoute', 'remarks', 'runway']),
})(FlightPage);
