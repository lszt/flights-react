import React, { PropTypes, Component } from 'react';
import './AerodromeList.scss';
import SearchTerms from '../../util/SearchTerms.js';
import FilteredList from '../FilteredList';
import Config from 'Config';
import AerodromeItem from './AerodromeItem.js';

class AerodromeList extends Component {

  buildSearchTerms() {
    const searchTerms = new SearchTerms();
    if (this.props.aerodrome) {
      searchTerms.key(this.props.aerodrome.toUpperCase().trim(), ['LS']);
      searchTerms.child('name', this.props.aerodrome.toUpperCase().trim());
    }
    return searchTerms;
  }

  render() {
    const emptyMessage = 'Tippen Sie die ersten Buchstaben der ICAO-Identifikation oder des Namens und wählen ' +
      'Sie anschliessend aus der Liste hier aus.';

    const searchTerms = this.buildSearchTerms();

    const itemComparator = (aerodrome1, aerodrome2) => aerodrome1.value.name.localeCompare(aerodrome2.value.name);

    return (
      <FilteredList
        className="AerodromeList"
        emptyMessage={emptyMessage}
        searchTerms={searchTerms}
        itemComponentClass={AerodromeItem}
        firebaseUri={Config.firebaseUrl + '/aerodromes/'}
        itemComparator={itemComparator}
        onClick={this.props.onClick}
      />
    );
  }
}

AerodromeList.propTypes = {
  aerodrome: PropTypes.string,
  onClick: PropTypes.func,
};

export default AerodromeList;