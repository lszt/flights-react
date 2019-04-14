import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Field, getFormValues, reduxForm} from 'redux-form';
import validate from '../../validate';
import { renderAerodromeDropdown, renderDateField, renderTimeField, renderIncrementationField } from '../../renderField';
import FieldSet from '../../FieldSet';
import WizardNavigation from '../../../WizardNavigation';
import {updateMovementFees} from "../../../../util/landingFees"

const toNumber = value => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string' && value.match(/\d+/)) {
    return parseInt(value, 10);
  }
  return undefined;
};

const DepartureArrivalPage = (props) => {
  const { previousPage, handleSubmit, formValues } = props;
  return (
    <form onSubmit={handleSubmit} className="DepartureArrivalPage">
      <FieldSet>
        <Field
          name="location"
          component={renderAerodromeDropdown}
          normalize={aerodrome => aerodrome ? aerodrome.key : null}
          label="Startflugplatz"
          readOnly={props.readOnly}
        />
      </FieldSet>
      <FieldSet>
        <Field
          name="date"
          component={renderDateField}
          parse={e => e.value}
          label="Datum"
          readOnly={props.readOnly}
        />
        <Field
          name="time"
          component={renderTimeField}
          parse={e => e.value}
          label="Landezeit (Lokalzeit)"
          readOnly={props.readOnly}
        />
      </FieldSet>
      <FieldSet>
        <Field
          name="landingCount"
          format={toNumber}
          component={renderIncrementationField}
          parse={e => e.target.value}
          label="Anzahl Landungen"
          readOnly={props.readOnly}
          normalize={landingCount => {
            const mtow = formValues['mtow']
            const flightType = formValues['flightType']

            updateMovementFees(props.change, mtow, flightType, landingCount)

            return landingCount
          }}
        />
        <Field
          name="goAroundCount"
          format={toNumber}
          component={renderIncrementationField}
          parse={e => e.target.value}
          label="Anzahl Durchstarts (ohne Aufsetzen)"
          readOnly={props.readOnly}
        />
      </FieldSet>
      <WizardNavigation previousStep={previousPage} cancel={props.cancel}/>
    </form>
  );
};

DepartureArrivalPage.propTypes = {
  previousPage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  formValues: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  formValues: getFormValues('wizard')(state)
});

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate: validate('arrival', ['location', 'date', 'time', 'landingCount']),
})(connect(mapStateToProps)(DepartureArrivalPage));
