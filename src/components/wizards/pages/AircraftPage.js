import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../validate';
import { renderInputField, renderAircraftDropdown } from '../renderField';

const AircraftPage = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="AircraftPage">
      <fieldset>
        <legend>Flugzeugdaten</legend>
        <Field
          name="immatriculation"
          component={renderAircraftDropdown}
          label="Immatrikulation"
          normalize={aircraft => {
            if (aircraft) {
              props.change('aircraftType', aircraft.type);
              props.change('mtow', aircraft.mtow);
              return aircraft.key;
            }
            return null;
          }}
        />
        <Field
          name="aircraftType"
          type="text"
          component={renderInputField}
          label="Typ"
        />
        <Field
          name="mtow"
          type="number"
          component={renderInputField}
          label="Maximales Abfluggewicht (in Kilogramm)"
        />
      </fieldset>
      <div className="WizardNavigation">
        <button type="submit" className="next">Weiter</button>
      </div>
    </form>
  );
};

AircraftPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate: validate(null, ['immatriculation', 'aircraftType', 'mtow']),
})(AircraftPage);