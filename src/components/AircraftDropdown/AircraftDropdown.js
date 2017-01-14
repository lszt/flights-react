import React from 'react';
import Dropdown from '../Dropdown';
import Option from './Option';

const optionRenderer = aircrafts => {
  const map = aircrafts.reduce((map, obj) => {
    map[obj.key] = obj;
    return map;
  }, {});
  return (option, focussed) => (
    <Option
      immatriculation={option.key}
      type={map[option.key].type}
      focussed={focussed}
    />
  );
};

const toOption = key => ({
  key,
  label: key,
});

const aircraftToOption = aircraft => toOption(aircraft.key);

const normalizeImmatriculation = value => value.toUpperCase().replace(/[^A-Z0-9]/, '');

const aircraftsComparator = (aircraft1, aircraft2) => aircraft1.key.localeCompare(aircraft2.key);

const callWithValue = (delegate, aircrafts, value) => {
  const aircraft = aircrafts.find(item => item.key === value);
  if (aircraft) {
    delegate(aircraft);
  } else {
    delegate({
      key: value,
    });
  }
};

const AircraftDropdown = props => (
  <Dropdown
    options={props.aircrafts.data.array.sort(aircraftsComparator).map(aircraftToOption)}
    optionRenderer={optionRenderer(props.aircrafts.data.array)}
    onChange={callWithValue.bind(null, props.onChange, props.aircrafts.data.array)}
    onBeforeInputChange={normalizeImmatriculation}
    value={props.value}
    noOptionsText="Kein Flugzeug gefunden"
    moreOptionsText="Mehr Flugzeuge vorhanden! Tippen Sie einen Teil der Immatrikulation, um die Liste einzuschränken."
    onFocus={props.onFocus}
    onBlur={callWithValue.bind(null, props.onBlur, props.aircrafts.data.array)}
    readOnly={props.readOnly}
  />
);

AircraftDropdown.propTypes = {
  value: React.PropTypes.string.isRequired,
  aircrafts: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func.isRequired,
  readOnly: React.PropTypes.bool,
};

export default AircraftDropdown;
