import React from 'react';
import WizardStep from '../../WizardStep';
import SingleSelect from '../../SingleSelect';
import LabeledComponent from '../../LabeledComponent';

class FlightData extends WizardStep {

  constructor(props) {
    super(props);
    this.types = [
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
    this.arrivalRoutes = [
      {
        label: 'Sektor Nord',
        value: 'north',
      }, {
        label: 'Sektor Süd',
        value: 'south',
      }, {
        label: 'Platzrunden',
        value: 'circuits',
        description: 'Ohne Verlassen des Platzverkehrs',
        available: data => data.location.toUpperCase() === 'LSZT',
      },
    ];
    this.runway = [
      {
        label: '06',
        value: '06',
      }, {
        label: '24',
        value: '24',
      },
    ];
  }

  render() {
    const typeComponent = (
      <SingleSelect
        items={this.types}
        value={this.state.data.flightType}
        onChange={this.getUpdateHandlerDelegate('flightType', this)}
        orientation="vertical"
      />
    );
    const arrivalRouteComponent = (
      <SingleSelect
        items={this.filterOptions(this.arrivalRoutes)}
        value={this.state.data.arrivalRoute}
        onChange={this.getUpdateHandlerDelegate('arrivalRoute', this)}
        orientation="vertical"
      />
    );
    const remarksComponent = (
      <textarea
        value={this.state.data.remarks}
        onChange={this.getUpdateHandlerDelegate('remarks', this)}
      />
    );
    const runwayComponent = (
      <SingleSelect
        items={this.runway}
        value={this.state.data.runway}
        onChange={this.getUpdateHandlerDelegate('runway', this)}
      />
    );

    return (
      <fieldset className="FlightData">
        <legend>Flug</legend>
        <LabeledComponent
          label="Typ"
          className="type"
          component={typeComponent}
          validationError={this.getValidationError('flightType')}
        />
        <LabeledComponent
          label="Ankunftsroute"
          className="arrival-route"
          component={arrivalRouteComponent}
          validationError={this.getValidationError('arrivalRoute')}
        />
        <LabeledComponent
          label="Bemerkungen"
          className="remarks"
          component={remarksComponent}
          validationError={this.getValidationError('remarks')}
        />
        <LabeledComponent
          label="Pistenrichtung"
          className="runway"
          component={runwayComponent}
          validationError={this.getValidationError('runway')}
        />
      </fieldset>
    );
  }

  getValidationConfig() {
    return {
      flightType: {
        types: {
          required: true,
          values: ['private', 'commercial', 'instruction'],
        },
        message: 'Wählen Sie hier den Typ des Fluges aus.',
      },
      arrivalRoute: {
        types: {
          required: true,
          values: ['north', 'south', 'circuits'],
        },
        message: 'Wählen Sie hier die Ankunftsroute aus.',
      },
      runway: {
        types: {
          required: true,
          values: ['06', '24'],
        },
        message: 'Wählen Sie hier die Pistenrichtung für die Landung aus.',
      },
    };
  }
}

export default FlightData;
